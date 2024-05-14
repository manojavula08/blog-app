
import React from 'react'
import { Form } from "react-router-dom"

const Login = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Namaste</h2>
            <Form className="space-y-4" method='post'>
                <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 focus: outline-none"
                    placeholder="Enter your username"
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 focus:outline-none"
                    placeholder="Enter your password"
                />
                </div>
                <div className="flex justify-between items-center">
                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                    Login
                </button>
                <div>
                    <a href="#" className="text-sm text-indigo-500 hover:text-indigo-700">
                    Forgot Password?
                    </a>
                    <span className="mx-2 text-gray-500">|</span>
                    <a href="#" className="text-sm text-indigo-500 hover:text-indigo-700">
                    New User
                    </a>
                </div>
                </div>
            </Form>
            </div>
        </div>
        );
}

export default Login

