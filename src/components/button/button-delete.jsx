import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Buttondelete = ({ click }) => {
  return (
    <button
      type="button"
      onClick={click}
      className="bg-red-600 px-2 py-1 rounded-lg hover:bg-red-800 flex text-center border border-solid border-red-600"
    >
      <FontAwesomeIcon className="text-white w-3 h-3" icon={faTrash} />
    </button>
  );
};
Buttondelete.propTypes = {
  click: PropTypes.func.isRequired, // Mengubah dari string menjadi function
};
export default Buttondelete;
