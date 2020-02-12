import React from 'react';

// : {any, () => any | void}
const NavButton = ({ children, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default NavButton;