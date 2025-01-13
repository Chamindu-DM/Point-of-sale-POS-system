import PropTypes from "prop-types";
import React from "react";

export const AddToCartButton = ({
    label = "Add to cart",
    state,
    className,
    addToCartButtonClassName,
}) => {
    return (
        <button className={`add-to-cart-button ${state} ${className}`}>
            <button className={`text-wrapper ${addToCartButtonClassName}`}>
                {label}
            </button>
        </button>
    );
};

AddToCartButton.propTypes = {
    label: PropTypes.string,
    state: PropTypes.oneOf(["hover", "default"]),
};
