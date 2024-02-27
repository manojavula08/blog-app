import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
        <nav className='navbar navbar-light bg-light'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>Manoj</Link>
                <div className='navbar-nav d-flex'>
                <NavLink to="/">Home</NavLink>
                <NavLink to='/getAll_blog/'>My Profile</NavLink>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;