import PropTypes from 'prop-types';
import '../../assets/style/list.css';

const Modal = ({ isOpen, onClose, children, title, className, showHeader }) => {
  if (!isOpen) return null; // Modal won't render if not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-lg  max-w-4xl shadow-lg z-50 ${className}`}>
        {/* Modal Header */}
        <div className="flex justify-between items-center font-poppins mb-1">
        {showHeader && (
            <div className="bg-[#DFFFF9] border border-solid border-[#00C59C] p-4 -mt-16 text-center">
              <h3 className="text-lg font-bold text-[#468585]">{title}</h3>
            </div>
        )}
          <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
        </div>

        {/* Modal Content */}
        <div className="max-h-96 overflow-y-auto no-scrollbar">{children}</div> {/* Batas tinggi dan overflow */}
      </div>
    </div>
  );
};

// Menambahkan validasi PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,  // Modal akan ditampilkan jika true
  onClose: PropTypes.func.isRequired, // Fungsi untuk menutup modal
  children: PropTypes.node,           // Konten yang akan ditampilkan di dalam modal
  title: PropTypes.string,            // Judul modal
  className: PropTypes.string,        // Menambahkan prop className
  showHeader: PropTypes.bool,
};

// Menambahkan defaultProps untuk properti opsional
Modal.defaultProps = {
  title: 'Default Title', // Judul default jika tidak ada judul yang diberikan
  children: null,         // Default nilai untuk konten modal jika tidak ada konten
  className: '',          // Default nilai untuk className
};

export default Modal;
