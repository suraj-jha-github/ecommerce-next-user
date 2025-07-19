import Container from "@/components/ui/container";
import Link from "next/link";

export default function NotFound() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link 
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </Container>
    );
} 