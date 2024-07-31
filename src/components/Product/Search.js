import { Fragment, useState } from "react";
import MetaData from "../../more/MetaData";
import { useNavigate } from "react-router-dom";
// import "./Search.css";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search" />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="relative w-full max-w-md"
          onSubmit={searchSubmitHandler}
        >
          <input
            type="text"
            id="search-input"
            placeholder="Search by product name..."
            className="w-full py-2 pl-4 pr-10 rounded-lg shadow-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            id="search-button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={searchSubmitHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Search;
