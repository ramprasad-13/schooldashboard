import { useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const pagesToShow = 3;
    const [startPage, setStartPage] = useState(1);
    const pages = pageNumbers.slice(startPage - 1, startPage - 1 + pagesToShow);
  
    const handleClick = (number) => {
      setCurrentPage(number);
    };
  
    const handleMoreClick = () => {
      setStartPage(startPage + pagesToShow);
    };
  
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handleClick(currentPage - 1)}>Previous</a>
          </li>
          {startPage > 1 && <li className="page-item"><a className="page-link" onClick={() => setStartPage(startPage - pagesToShow)}>...</a></li>}
          {pages.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a className="page-link" onClick={() => handleClick(number)}>{number}</a>
            </li>
          ))}
          {totalPages > startPage + pagesToShow - 1 && <li className="page-item"><a className="page-link" onClick={handleMoreClick}>...</a></li>}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handleClick(currentPage + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    );
  };
  
  Pagination.propTypes = {
      currentPage: PropTypes.number.isRequired,
      setCurrentPage: PropTypes.func.isRequired,
      totalPages: PropTypes.number.isRequired,
  }
export default Pagination
