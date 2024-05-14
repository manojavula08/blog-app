import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import {action as Logout} from '../../pages/Logout'
import {GetToken} from '../../pages/Token';
const Navbar = () => {

    const root = GetToken()
    console.log(root+'   rfghj')
    return (
        <nav className="bg-orange-300 p-4">
            <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="text-white text-2xl font-bold">
                My Blog
            </NavLink>
            <div>
                <NavLink
                to="/"
                className="text-white hover:text-orange-500 ml-4 mr-2 font-semibold"
                >
                Home
                </NavLink>
                <NavLink
                to="/write-blog"
                className="text-white hover:text-gray-300 ml-4 mr-2 font-semibold"
                >
                Write Blog
                </NavLink>
                <NavLink
                to="/my-profile"
                className="text-white hover:text-gray-300 ml-4 mr-2 font-semibold"
                >
                My Profile
                </NavLink>
                {root && <NavLink
                to="/auth"
                onClick={Logout}
                className="text-white hover:text-gray-300 ml-4 mr-2 font-semibold"
                >
                Logout
                </NavLink>}
                
            </div>
            </div>
        </nav>
        );
}

export default Navbar;