import { useState } from "react";
import Router from "next/router";

const Header = ({ currentUser }) => {
    return currentUser?.email ?
        (
            <div >
                <h1>Ticketing</h1>
                {currentUser?.email}
            </div >
        ) : (
            <div >
                <h1>Ticketing</h1>

            </div >
        );
};

export default Header;
