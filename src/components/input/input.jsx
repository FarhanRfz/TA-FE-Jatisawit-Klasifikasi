import PropTypes from "prop-types";

const Input = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  type,
  options,
  span,
  className,
  eror,
  valueInput,
}) => {
  if (type === "select") {
    return (
      <div className="font-poppins flex items-center gap-2">
        <div className="w-[30%] ">
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        </div>
        <div className="w-[70%] flex items-center font-poppins">
          <select
            id={id}
            name={name} // Include name here
            value={value}
            onChange={onChange}
            className={`${className} border h-10 p-2 border-gray-300 rounded-md text-sm`}
            required={required}
          >
            <option value="">Pilih {label}</option> {/* Default option */}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm mt-1">{eror}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3 flex items-center gap-4 font-poppins">
      <div className="w-[30%] ">
        <label
          htmlFor={id}
          className="block text-sm font-semibold font-poppins text-gray-700"
        >
          {label}
        </label>
      </div>
      <div className="w-[70%] flex items-center font-poppins ">
        <input
          id={id}
          name={name} // Include name here
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} block h-10 font-poppins p-2 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
          required={required}
        />
        <div className="">
          <p className="text-red-500 text-sm mt-1">{eror}</p>
          <p className="text-xs text-slate-400">{valueInput}</p>
          {span && (
            <span className="w-14 h-10 p-2 rounded-r-lg text-sm">{span}</span>
          )}{" "}
          {/* Only render if span exists */}

        </div>
        
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, // Required prop for name
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
  span: PropTypes.string,
  className: PropTypes.string,
  eror: PropTypes.string,
  valueInput: PropTypes.string
};

export default Input;
