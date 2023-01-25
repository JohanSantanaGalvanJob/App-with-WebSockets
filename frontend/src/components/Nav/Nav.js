import React from "react";


const Nav = () => {
    const user = localStorage.getItem("userId");
    return (
        <nav className='navbar'>
            <h3>Lista de la compra</h3>
                    <img src="./favicon.ico" width="50px"></img>
					<h3>Usuario {user}</h3>
        </nav>
    );
};

export default Nav;