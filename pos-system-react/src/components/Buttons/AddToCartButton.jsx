import React from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({ label, onClick, className }) => {
    return (
        <button 
            className={`add-to-cart-button ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

AddToCartButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

AddToCartButton.defaultProps = {
    className: ''
};

export default AddToCartButton;