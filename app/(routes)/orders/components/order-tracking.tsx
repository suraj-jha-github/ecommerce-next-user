"use client";

import { CheckCircle, Clock, Package, Truck } from "lucide-react";

interface OrderTrackingProps {
    status: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ status }) => {
    const steps = [
        { id: 'PENDING', label: 'Order Placed', icon: Clock },
        { id: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle },
        { id: 'PROCESSING', label: 'Processing', icon: Package },
        { id: 'SHIPPED', label: 'Shipped', icon: Truck },
        { id: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
    ];

    const getCurrentStepIndex = () => {
        const stepIndex = steps.findIndex(step => step.id === status);
        return stepIndex >= 0 ? stepIndex : 0;
    };

    const currentStepIndex = getCurrentStepIndex();

    return (
        <div className="mt-6">
            <h4 className="font-semibold mb-4">Order Progress</h4>
            <div className="relative">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="mt-2 text-center">
                                    <p className={`text-xs font-medium ${
                                        isCompleted ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                        {step.label}
                                    </p>
                                    {isCurrent && (
                                        <p className="text-xs text-blue-600 font-medium">
                                            Current
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Progress Line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
                    <div 
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderTracking; 