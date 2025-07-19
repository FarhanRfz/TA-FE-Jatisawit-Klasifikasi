// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const Button = ({ onClick, className="", children="" }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;