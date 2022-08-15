import React, { useState, useMemo } from "react";
import { index } from "../../../db_api";
import Pagination from "../../components/pagination";

export default function People() {
  const people = index("people");

  const PageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return people.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <>
      <table className="people_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr>
                <td className="person_id">{item.id}</td>
                <td className="person_first-name">{item.firstName}</td>
                <td className="person_last-name">{item.lastName}</td>
                <td className="person_date">{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={people.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
