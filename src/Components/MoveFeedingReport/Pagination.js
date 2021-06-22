import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  console.log(postsPerPage, "postsPerPage");
  console.log(totalPosts, "totalPosts");
  const pageNumbers = [];
  console.log(pageNumbers, "pageNumbers");

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.length > 0 ? (
        <div className="pagination">
          <div className="pagination_item">
            <Form.Label className="pagination_title">Անցնել դեպի </Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              defaultValue={currentPage}
              max={pageNumbers[pageNumbers.length - 1]}
              min="1"
              onChange={(e) => {
                const page =
                  e.target.value <= pageNumbers[pageNumbers.length - 1] &&
                  e.target.value > 0
                    ? Number(e.target.value)
                    : 1;

                paginate(page);
              }}
              style={{ width: "100px" }}
            />
          </div>
          <div className="pagination_item">
            <button
              className="page-link"
              onClick={() => paginate(1)}
              disabled={currentPage - 1 <= 0}
            >
              {"<<"}
            </button>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage - 1 <= 0}
            >
              {"<"}
            </button>
            <Link
              style={{ pointerEvents: "none" }}
              className="page-link"
              disabled={true}
            >
              {currentPage} / {pageNumbers[pageNumbers.length - 1]}
            </Link>

            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              {">"}
            </button>
            <button
              className="page-link"
              onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              {">>"}
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Pagination;
