import React from 'react';

export const Button = ({ onClick, disabled }) => (
    <button type="button" className="button" onClick={onClick} disabled={disabled}>
        Load more
    </button>
);