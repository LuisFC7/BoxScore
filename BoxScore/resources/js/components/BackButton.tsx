import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
    return (
        <div className="p-4">
            <a
                href="/dashboard"
                className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
                <ArrowLeftIcon className="h-6 w-6" />
                
            </a>
        </div>
    );
}
