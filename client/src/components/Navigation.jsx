import React from 'react';
import {Link} from "react-router-dom";
import {BiLock} from "react-icons/all";

const Navigation = () => {
    return (
            <header className="bg-dark-40  fixed top-0 left-0 w-full py-4">
                <div className="container flex justify-between px-4">
                    <Link to="/">
                        <div className="flex items-center gap-x-2">
                            <div className="w-9">
                                <img src="/icons/logo.svg" alt=""/>
                            </div>
                            <h2 className="font-medium text-xl">FlyText</h2>
                        </div>
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-x-4">
                            <li>
                                <button className="btn"><Link className="flex items-center gap-x-1" to="/login">
                                    <BiLock />
                                    Login
                                </Link></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};

export default Navigation;