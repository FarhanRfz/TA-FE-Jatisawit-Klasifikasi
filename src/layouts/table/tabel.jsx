import { useState } from 'react';
import PropTypes from 'prop-types';
import Buttonedit from '../../components/button/button-edit';
import Buttondelete from '../../components/button/button-delete';
import Buttonshow from '../../components/button/button-show';
import Pagination from '../../components/pagination/pagination';

const Table = ({
  tableData,
  columns,
  onEdit = () => {},
  onShow = () => {},
  onDelete = () => {},
  className = '',
  enablePagination = true,
  imageUrl = '',
  idKey = 'id',
  tableImage = '',
  units = [],
  buttons = {}
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = tableData && tableData.length > 0
    ? Math.ceil(tableData.length / rowsPerPage)
    : 0;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = enablePagination
    ? tableData.slice(indexOfFirstRow, indexOfLastRow)
    : tableData;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const toSnakeCase = (str) => {
    return str
      .replace(/[_\s]+/g, '_')
      .replace(/[\s]+/g, '')
      .trim()
      .toLowerCase();
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto shadow-md rounded-lg outline outline-1 outline-gray-300">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              {columns.map((column, colIndex) => {
                const unit = units[colIndex] || '';
                const label = typeof column === 'object' ? column.label : column;
                return (
                  <th
                    key={colIndex}
                    className="py-4 px-4 bg-teal-50 text-center text-gray-600 font-semibold"
                  >
                    {`${label} ${unit}`}
                  </th>
                );
              })}
              {(buttons.show || buttons.edit || buttons.delete) && (
                <th className="py-4 px-4 bg-teal-50 text-center text-gray-600 font-semibold">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => {
              // Hitung nomor urut global berdasarkan indeks asli
              const globalIndex = indexOfFirstRow + index;
              return (
                <tr key={row[idKey] || globalIndex}>
                  {columns.map((column, colIndex) => {
                    const columnKey = typeof column === 'object'
                      ? column.key
                      : toSnakeCase(column);
                    const unit = units[colIndex] || '';

                    let cellContent;
                    if (columnKey === 'no') {
                      cellContent = globalIndex + 1; // Nomor urut global
                    } else {
                      cellContent = row[columnKey];
                    }

                    return (
                      <td key={colIndex} className="border-t px-4 py-2 text-center">
                        {columnKey === 'gambar' || columnKey === tableImage
                          ? cellContent && (
                              <img
                                src={`${imageUrl}${cellContent}`}
                                alt={tableImage}
                                className="w-16 h-16 object-cover mx-auto"
                              />
                            )
                          : (
                              <span>
                                {cellContent ? `${truncateText(cellContent, 16)} ${unit}` : '-'}
                              </span>
                            )}
                      </td>
                    );
                  })}
                  {(buttons.show || buttons.edit || buttons.delete) && (
                    <td className="border-t px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        {buttons.show && <Buttonshow click={() => onShow(row)} />}
                        {buttons.edit && <Buttonedit click={() => onEdit(row)} />}
                        {buttons.delete && <Buttondelete click={() => onDelete(row)} />}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
      })
    ])
  ).isRequired,
  units: PropTypes.arrayOf(PropTypes.string),
  onEdit: PropTypes.func,
  onShow: PropTypes.func,
  onDelete: PropTypes.func,
  buttons: PropTypes.shape({
    show: PropTypes.bool,
    edit: PropTypes.bool,
    delete: PropTypes.bool
  }),
  className: PropTypes.string,
  enablePagination: PropTypes.bool,
  imageUrl: PropTypes.string,
  idKey: PropTypes.string,
  tableImage: PropTypes.string
};

Table.defaultProps = {
  units: [],
  onEdit: () => {},
  onShow: () => {},
  onDelete: () => {},
  buttons: {
    show: true,
    edit: true,
    delete: true
  },
  className: '',
  enablePagination: true,
  imageUrl: '',
  idKey: 'id',
  tableImage: ''
};

export default Table;