import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Buttonback = ({ onClick, text, className }) => {
    return (
        <button 
        onClick={onClick} 
        className={` bg-gradient-to-b text-[12px] from-[#2d437e] to-[#5c79c8] font-medium hover:from-[#3498db] hover:to-[#3498db] text-white px-4 py-1 rounded-2xl font-poppins  ${className}`}
        >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
        {text}
        </button>
    );
};

// Define prop types
Buttonback.propTypes = {
  onClick: PropTypes.func.isRequired,  // Callback function for the button click
  text: PropTypes.string.isRequired,   // Text to display on the button
  className: PropTypes.string,         // Additional custom CSS classes
};

// Default props (optional)
Buttonback.defaultProps = {
  className: '',  // Empty string for className by default
};

export default Buttonback;
