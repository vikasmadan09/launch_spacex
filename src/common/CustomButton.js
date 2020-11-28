import React from 'react';
import { Button, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const CustomButton = withRouter(({ label, type, history, }) => {
    const dispatch = useDispatch();
    const { key } = useSelector((state) => state.data);
    const handleClick = (e) => {
        const btntxt = e.target.value[0].toLowerCase() + e.target.value.slice(1);

        history.push({
            search: `?${type}=${btntxt}`,
        });
        dispatch({ type: 'SET_KEY', payload: key + 1 });
    };
    return (
        <Col sm="6">
            <Button
                color="success"
                size="sm"
                onClick={handleClick}
                value={label}
                className="mb-2 custom-button"
            >
                {label}
            </Button>{' '}
        </Col>
    );
});
