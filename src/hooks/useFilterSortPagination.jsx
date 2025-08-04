import { useState, useMemo } from "react";

const useFilterSortPagination = (data, options = {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(options.defaultSort || "latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = options.itemsPerPage || 10;

  const processedData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.nama_anak?.toLowerCase().includes(lowerSearch) ||
        item.user_nama?.toLowerCase().includes(lowerSearch) ||
        item.nama_lengkap_orangtua?.toLowerCase().includes(lowerSearch)
      );
    }

    // Konversi string ke Date untuk pengurutan (dukung ISO atau DD-MM-YYYY)
    const parseDate = (dateStr) => {
      if (!dateStr || dateStr === '-') return new Date(0); // Default ke tanggal awal jika invalid
      // Coba parse sebagai ISO terlebih dahulu
      const isoDate = new Date(dateStr);
      if (!isNaN(isoDate.getTime())) return isoDate;
      // Jika bukan ISO, coba parse DD-MM-YYYY
      const [day, month, year] = dateStr.split('-');
      return new Date(`${year}-${month}-${day}`);
    };

    // Sort data
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.nama_anak.localeCompare(b.nama_anak);
        case "name-desc":
          return b.nama_anak.localeCompare(a.nama_anak);
        case "oldest":
          return parseDate(a.waktu_klasifikasi) - parseDate(b.waktu_klasifikasi);
        case "latest":
        default:
          return parseDate(b.waktu_klasifikasi) - parseDate(a.waktu_klasifikasi);
      }
    });

    return filtered;
  }, [data, searchTerm, sortOption]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    goToPage,
    paginatedData,
    allData: processedData,
  };
};

export default useFilterSortPagination;