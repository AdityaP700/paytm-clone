// BottomWarning.jsx
import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, to, buttonText }) => {
    return (
        <div className="py-2 text-sm flex justify-center"> {/* Fixed typo "jutify" to "justify" */}
            <div>
                {label}
            </div>
            <Link className="pointer underline pl-1 cursor" to={to}>
                {buttonText}
            </Link>
        </div>
    );
};

export default BottomWarning; // Default export
