import PropTypes from 'prop-types';
import '../../assets/style/list.css';

const Modal = ({ isOpen, onClose, children, title, className, showHeader, backdropClassName, backdropStyle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center">
      {/* Backdrop dengan backdropClassName dan backdropStyle */}
      <div
        className={`absolute inset-0 bg-transparent bg-opacity-40 ${backdropClassName || ''}`}
        style={{ backgroundColor: 'transparent', backdropFilter: 'none', ...backdropStyle }}
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className={`relative bg-white p-6 rounded-lg max-w-4label max-w-4xl shadow-lg z-[101] ${className}`}>
        <div className="flex justify-between items-center font-poppins mb-1">
          {showHeader && (
            <div className="bg-[#DFFFF9] border border-solid border-[#00C59C] p-4 -mx-6 -mt-6 text-center">
              <h3 className="text-lg font-bold text-[#468585]">{title}</h3>
            </div>
          )}
          <button onClick={onClose} className="text-gray-600 text-xl absolute top-4 right-4">×</button>
        </div>
        <div className="max-h-96 overflow-y-auto no-scrollbar">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  showHeader: PropTypes.bool,
  backdropClassName: PropTypes.string,
  backdropStyle: PropTypes.object,
};

Modal.defaultProps = {
  title: 'Default Title',
  children: null,
  className: '',
  showHeader: false,
  backdropClassName: '',
  backdropStyle: {},
};

export default Modal;