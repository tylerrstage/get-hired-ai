import React from "react";
import './Logo.css';
import { SparkleIcon } from "./icons";

function Logo(){
    return(
        <div className="logo">
            <span className="logo-mark">
                <SparkleIcon width={18} height={18} />
            </span>
            <span className="logo-text">GetHired</span>
        </div>
    )
}

export default Logo;
