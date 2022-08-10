import React from 'react';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';

function Pagination(props) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={[`pagination-container ${className}`]}>
      {/* Left navigation arrow */}
      <li className={`previous_page pagination-item${currentPage === 1 ? ' disabled' : ''}`} onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={`pagination-item${pageNumber === currentPage ? ' selected' : ''}`}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`next_page pagination-item${currentPage === lastPage ? ' disabled' : ''}`}
        onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
}

export default Pagination;
