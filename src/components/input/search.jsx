import PropTypes from "prop-types";

const SearchInput = (props) => {
  return (
    <input
      type="search"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={`border h-10 border-gray-300 rounded-md p-2 ${props.className}`}
    />
  );
};
SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired, // Harus string dan wajib
  className: PropTypes.string.isRequired, // Harus string dan wajib
  value: PropTypes.string.isRequired, // Harus string dan wajib
  onChange: PropTypes.func.isRequired,     // Harus fungsi dan wajib
};

SearchInput.defaultProps = {
  className: "",
};
export default SearchInput;
