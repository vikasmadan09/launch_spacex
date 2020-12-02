import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export const CustomButton = ({ label, type, onClick }) => {
    return (
        <>
            <Button
                color="success"
                size="sm"
                onClick={e=>onClick(e,type)}
                value={label}
                className="mb-2 custom-button"
            >
                {label}
            </Button>{' '}
        </>
    );
};

CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
