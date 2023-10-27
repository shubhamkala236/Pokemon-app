"use client";
import Card from "@/components/Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//-----------------------------JSX---------------------------
const page = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const getAll = async () => {
    let res = await fetch(`http://localhost:3000/api/pokemon`);
    let data = await res.json();
    setData(data);
  };

  //return in use effect cause the clean up function
  useEffect(() => {
    getAll();
    const delay = 300; // Adjust the delay as needed
    const timer = setTimeout(() => {
      console.log("Api called");
      setDebouncedSearchQuery(searchQuery);
    }, delay);

    return () => {
      console.log("timer clear", searchQuery);
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  };

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="main">
      <div className="heading">POKEDEX</div>
      <div className="search-container">
        <input value={searchQuery} onChange={handleSearch} className="search" />
        {/* <input value={searchQuery} onChange={betterFn} className="search" /> */}
      </div>
      <div className="list-container">
        {records.map((item) => (
          <Link
            key={item.name}
            className="card-link"
            href={`/description/${item.name}`}
          >
            <Card name={item.name} />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <nav aria-label="Page navigation example" className="pagination">
          {currentPage !== 1 ? (
            <li className="page-item">
              <Link className="page-link" href="/" onClick={prevPage}>
                Prev
              </Link>
            </li>
          ) : (
            <></>
          )}

          {numbers.map((number, i) => (
            <li
              className={`page-item ${currentPage === number ? "active" : ""}`}
              key={i}
            >
              <Link
                href="/"
                className="page-link"
                onClick={() => changeCurrentPage(number)}
              >
                {number}
              </Link>
            </li>
          ))}
          {currentPage !== nPages ? (
            <li className="page-item">
              <Link className="page-link" href="/" onClick={nextPage}>
                Next
              </Link>
            </li>
          ) : (
            <></>
          )}
        </nav>
      </div>
    </div>
  );
};

export default page;
