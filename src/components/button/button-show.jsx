import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Buttonshow = (props) => {
    return (
        <button 
        onClick={props.click}
        type="button" className="bg-white px-2 py-1 rounded-lg flex text-center hover:bg-slate-200 border border-solid border-black">
            <FontAwesomeIcon className="text-black w-3 h-3" icon={faEye} />
        </button>
    );
    
};
Buttonshow.propTypes = {
    click: PropTypes.func.isRequired, // Mengubah dari string menjadi function
};
export default Buttonshow;