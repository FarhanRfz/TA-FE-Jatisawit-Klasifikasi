import PropTypes from 'prop-types';

const Buttonsave = (props) => {
    return (
        <button 
        onClick={props.onClick} 
        className={`font-poppins bg-gradient-to-b from-teal-400 to-[#3498db] text-[12px] font-medium hover:from-[#2771a3] hover:to-[#2771a3] text-white px-6 py-2 rounded-2xl ${props.className}`}
        >
        {props.text}
        </button>
    );
};

Buttonsave.propTypes = {
    onClick: PropTypes.func.isRequired,  // Mengubah dari string ke function, karena onClick adalah fungsi
    className: PropTypes.string,         // className bisa opsional, tidak perlu wajib jika tidak ada tambahan
    text: PropTypes.string.isRequired,   // Tetap string dan wajib
};

export default Buttonsave;
