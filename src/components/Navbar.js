import React from 'react';

const Navbar = () => {
    return (
        <nav className="h-20 mb-10 flex items-center justify-between px-10">
            <h1 className="text-4xl">Aus Stargazers</h1>
            <a 
                href="https://github.com/teejcoder" 
                target="_" 
                className="hover:underline"
            >
                GitHub
            </a>
        </nav>
    );
};

export default Navbar;