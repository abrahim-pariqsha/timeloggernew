/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";

function Pagination({pages , setCurrentPage}) {


  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
      setCurrentPage(currentButton);
  },[currentButton,setCurrentPage])
  
  
  return (
    <div className="clearfix">
      <div className="hint-text">
        {" "}
      </div>
      <ul className="pagination">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          } `}
        >
          <a
            className="page-link"
            onClick={() => setCurrentButton((prev) => (prev === 1 ? prev : - 1))}
            
          >
           <i className="fa-solid fa-angle-left" ></i>
          </a>
        </li>

        {numOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${currentButton === page ? 'page-item active' : 'page-item' 
            }`}
            >
              <a
                href="#!"
                className="page-link"
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={`${currentButton === numOfPages?.length ? 'page-item disabled' : 'page-item' } ` }>
          <a
            href="#!"
            className="page-link"
            onClick={() =>
              setCurrentButton((next) =>
                next === numOfPages?.length ? next : + 1
              )
            }
          >
           <i className="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Pagination;
