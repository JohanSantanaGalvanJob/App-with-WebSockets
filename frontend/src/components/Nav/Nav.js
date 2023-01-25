import React from "react";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
// import {
//     NovuProvider,
//     PopoverNotificationCenter,
//     NotificationBell,
// } from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const socket = socketIO.connect("http://localhost:4000");

const Nav = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("userId");

    // const onNotificationClick = (notification) =>
    //     navigate(notification.cta.data.url);
    return (
        <nav className='navbar'>
            <h3>Lista de la compra</h3>
                    <img src="./favicon.ico" width="50px"></img>
					<h3>Usuario {user}</h3>
				
            {/* <div>
                <NovuProvider
                    subscriberId='<SUBSCRIBER_ID>'
                    applicationIdentifier='<APP_ID>'
                >
                    <PopoverNotificationCenter
                        onNotificationClick={onNotificationClick}
                        colorScheme='light'
                    >
                        {({ unseenCount }) => (
                            <NotificationBell unseenCount={unseenCount} />
                        )}
                    </PopoverNotificationCenter>
                </NovuProvider>
            </div> */}
        </nav>
    );
};

export default Nav;