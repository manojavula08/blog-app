import React from "react";
import { Link, redirect } from "react-router-dom";


const ErrorPage = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">
            Oops! Something went wrong. The page you're looking for doesn't exist.
        </p>
        <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
            <Link to={'/'}>Go Back</Link>
        </button>
        </div>
    </div>
    );
};

export default ErrorPage;
