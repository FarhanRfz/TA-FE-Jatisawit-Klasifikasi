import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Buttonedit = (props) => {
    return (
        <button
            type="button"
            onClick={props.click} // Menggunakan `onClick` dengan camelCase
            className="bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-800 flex text-center border border-solid border-blue-500"
        >
            <FontAwesomeIcon className="text-white w-3 h-3" icon={faPenToSquare} />
        </button>
    );
};

// Penulisan PropTypes yang benar
Buttonedit.propTypes = {
    click: PropTypes.func.isRequired, // Mengubah dari string menjadi function
};

export default Buttonedit;
