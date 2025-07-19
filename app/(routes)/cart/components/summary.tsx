"use client"

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CreditCard, DollarSign, User, Phone, MapPin } from 'lucide-react';

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart(state => state.items);
    const removeAll = useCart(state => state.removeAll);
    const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);
    const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'COD'>('STRIPE');
    const [isLoading, setIsLoading] = useState(false);
    
    // Customer details for COD
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showCustomerForm, setShowCustomerForm] = useState(false);

    useEffect(() => {
        if(searchParams.get('success')) {
            toast.success("Payment completed.");
            removeAll();
        }
        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.")
        }
    }, [searchParams, removeAll])

    // Show customer form for all payment methods
    useEffect(() => {
        setShowCustomerForm(true);
    }, [paymentMethod]);

    const onCheckout = async () => {
        setIsLoading(true);
        try {
            // Use a consistent user ID for demo purposes
            // In a real app, this would come from authentication
            const userId = "demo_user_123";
            
            const checkoutData: any = {
                productIds: items.map(item => item.id),
                userId: userId,
                paymentMethod: paymentMethod
            };

            // Add customer details for all orders
            checkoutData.customerName = customerName;
            checkoutData.phone = phone;
            checkoutData.address = address;
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, checkoutData);

            if (paymentMethod === 'COD') {
                // For COD, redirect to success page
                window.location = response.data.url;
            } else {
                // For Stripe, redirect to Stripe checkout
                window.location = response.data.url;
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            if (error.response?.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Something went wrong during checkout.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const isFormValid = () => {
        return customerName.trim() && phone.trim() && address.trim();
    };

    return ( 
        <div className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            
            {/* Payment Method Selection */}
            <div className='mt-6 space-y-4'>
                <div className='space-y-2'>
                    <h3 className='text-sm font-medium text-gray-900'>Payment Method</h3>
                    <div className='space-y-2'>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="STRIPE"
                                checked={paymentMethod === 'STRIPE'}
                                onChange={(e) => setPaymentMethod(e.target.value as 'STRIPE' | 'COD')}
                                className='text-blue-600 focus:ring-blue-500'
                            />
                            <CreditCard className='w-4 h-4' />
                            <span className='text-sm'>Credit Card (Stripe)</span>
                        </label>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={(e) => setPaymentMethod(e.target.value as 'STRIPE' | 'COD')}
                                className='text-blue-600 focus:ring-blue-500'
                            />
                            <DollarSign className='w-4 h-4' />
                            <span className='text-sm'>Cash on Delivery (COD)</span>
                        </label>
                    </div>
                </div>

                {/* Customer Details Form for All Orders */}
                {showCustomerForm && (
                    <div className='space-y-4 p-4 bg-white rounded-lg border'>
                        <h3 className='text-sm font-medium text-gray-900'>Customer Details (Required)</h3>
                        <div className='space-y-3'>
                            <div>
                                <label className='flex items-center space-x-2 text-sm text-gray-700'>
                                    <User className='w-4 h-4' />
                                    <span>Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className='flex items-center space-x-2 text-sm text-gray-700'>
                                    <Phone className='w-4 h-4' />
                                    <span>Phone Number *</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className='flex items-center space-x-2 text-sm text-gray-700'>
                                    <MapPin className='w-4 h-4' />
                                    <span>Delivery Address *</span>
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder="Enter your complete delivery address"
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                    <div className='text-base font-medium text-gray-400'>
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            
            <Button 
                disabled={items.length === 0 || isLoading || !isFormValid()} 
                className='w-full mt-6' 
                onClick={onCheckout}
            >
                {isLoading ? 'Processing...' : `Checkout with ${paymentMethod === 'COD' ? 'COD' : 'Card'}`}
            </Button>
            
            {paymentMethod === 'COD' && (
                <p className='mt-2 text-xs text-gray-500 text-center'>
                    Pay when you receive your order
                </p>
            )}
        </div>
     );
}
 
export default Summary;