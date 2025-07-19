import PropTypes from 'prop-types';

const Buttoncancel = (props) => {
    return (
        <button 
        onClick={props.onClick} 
        className={`bg-[#FE3D00] border text-[12px] border-solid border-[#C00000] h-10 text-white px-4 rounded-xl  hover:bg-red-600 font-poppins ${props.className}`}
        >
        {props.text}
        </button>
    );
};

Buttoncancel.propTypes = {
    onClick: PropTypes.func.isRequired,  // Mengubah dari string ke function, karena onClick adalah fungsi
    className: PropTypes.string,         // className bisa opsional, tidak perlu wajib jika tidak ada tambahan
    text: PropTypes.string.isRequired,   // Tetap string dan wajib
};

export default Buttoncancel;
