import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Buttonadd = (props) => {
  return (
    <button onClick={props.onClick} className={`bg-[#47fb86] text-white px-2 py-1 rounded-2xl text-[12px] font-medium hover:bg-[#35c266] font-poppins ${props.className}`}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      {props.text}
    </button>
  );
};

Buttonadd.propTypes = {
    onClick: PropTypes.string.isRequired,      // Harus string dan wajib
    className: PropTypes.string.isRequired,     // Harus string dan wajib
    text: PropTypes.string.isRequired, // Harus string dan wajib
    
};

export default Buttonadd;
