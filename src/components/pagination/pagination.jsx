import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center items-center py-3 px-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === i + 1 ? 'bg-[#196A6A] text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

// Menambahkan validasi PropTypes untuk memastikan tipe data benar
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,        // Halaman saat ini
  totalPages: PropTypes.number.isRequired,         // Total halaman yang ada
  handlePreviousPage: PropTypes.func.isRequired,   // Fungsi untuk kembali ke halaman sebelumnya
  handleNextPage: PropTypes.func.isRequired,       // Fungsi untuk ke halaman berikutnya
  handlePageChange: PropTypes.func.isRequired,     // Fungsi untuk berubah ke halaman spesifik
};

export default Pagination;
