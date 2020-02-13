import React from 'react';

// : {any, () => any | void}
const NavButton = ({ children, onClick }: { children: any, onClick: () => void }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="nav"
        >
            {children}
        </button>
    );
}

export default NavButton;