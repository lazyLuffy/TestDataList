import React, { useState, useEffect } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";

const SWAPI_ENDPOINT_PEOPLE = "https://swapi.dev/api/people/";

const DataTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let [peopleData, setPeopleData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [android, SetAndroid] = useState(0);
  let [page, setPage] = useState(1);

  const debouncedFetchData = _debounce(async () => {
    setLoading(true);
    setError(false);

    try {
      // Fetch people data based on search query
      const searchUrl = searchQuery ? `?search=${searchQuery}` : "";

      const peopleResponse = await axios.get(SWAPI_ENDPOINT_PEOPLE + searchUrl);
      setPeopleData(peopleResponse.data.results);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, 1000);

  useEffect(() => {
    return () => debouncedFetchData();
  }, [searchQuery, page]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSortKey(null); // Clear sorting on search
  };

  const handleSort = (key) => {
    setSortKey(key);
  };

  if (sortKey) {
    peopleData = peopleData.sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    );
  }

  const totalAndroid = peopleData.reduce((s, v, i) => {
    return (s += v.species.length);
  }, 0);

  console.log(totalAndroid, "TOTAL ANDROID");

  const totalHuman = peopleData.reduce((s, v, i) => {
    if (v.species.length === 0) {
      s++;
    }
    return s;
  }, 0);

  console.log(totalHuman, "TOTALHUMEN::::");
  // Render loading state
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <i
          className="fa fa-spinner fa-spin fs-2 text-danger"
          aria-hidden="true"
        ></i>
      </div>
    );
  }

  console.log(page, '""""""PAGE');

  // Render error state
  if (error) {
    return <i className="fas fa-exclamation-circle fs-1 text-danger"></i>;
  }

  console.log(peopleData, "data from the table");

  const getSpeciesLogo = (species) => {
    if (species.length > 0) {
      return <i class="fa fa-android fs-4 m-2" aria-hidden="true"></i>;
    } else {
      return <i class="fa fa-user-circle fs-4 m-2" aria-hidden="true"></i>;
    }
  };

  async function handlePage(value) {
    setLoading(true);
    const pageUrl = `?page=${value}`;
    const response = await axios.get(SWAPI_ENDPOINT_PEOPLE + pageUrl);
    setPeopleData(response.data.results);
    setLoading(false);
  }

  return (
    <div className="container my-4 ">
      {/* Search Input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="my-2 d-flex align-content-start gap-3">
        <span className="d-inline-flex flex-row align-items-center justify-content-center gap-1 text-white p-2  bg-primary rounded">
          <i class="fa fa-user-circle fs-4 m-2" aria-hidden="true"></i>
          <p className="d-flex p-0 m-0">
            Total Human
            <span className="mx-2">{totalHuman || 0}</span>
          </p>
        </span>
        <span className="d-inline-flex flex-row align-items-center justify-content-center gap-1 text-white p-2  bg-primary rounded">
          <i class="fa fa-android fs-4 m-2" aria-hidden="true"></i>
          <p className="d-flex p-0 m-0">
            Total Android
            <span className="mx-2">{totalAndroid || 0}</span>
          </p>
        </span>

        <span className="d-inline-flex flex-row align-items-center justify-content-center gap-1 text-white p-2  bg-primary rounded">
          <i class="fa fa-android fs-4 m-2" aria-hidden="true"></i>
          <p className="d-flex p-0 m-0">
            Total Any
            <span className="mx-2">0</span>
          </p>
        </span>
      </div>

      {/* Table */}

      <div class="table-responsive">
        <table className="table table-dark table-striped table-hover caption-top">
          <thead>
            <tr>
              <th onClick={() => handleSort("S.no")}>S.no</th>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("height")}>Height</th>
              <th onClick={() => handleSort("gender")}>Gender</th>
              <th onClick={() => handleSort("mass")}>Mass</th>
              <th onClick={() => handleSort("Hair Color")}>Hair Color</th>
              <th onClick={() => handleSort("Skin Color")}>Skin Color</th>
              <th onClick={() => handleSort("Eye Color")}>Eye Color</th>
              <th onClick={() => handleSort("BirthYear")}>BirthYear</th>
              <th onClick={() => handleSort("Home World")}>Home World</th>
              <th onClick={() => handleSort("films")}>films</th>
              <th onClick={() => handleSort("speices")}>speices</th>
              <th onClick={() => handleSort("vehiles")}>vehiles</th>
              <th onClick={() => handleSort("starships")}>starships</th>
              <th onClick={() => handleSort("created")}>created</th>
              <th onClick={() => handleSort("edited")}>edited</th>
              <th onClick={() => handleSort("url")}>url</th>
              {/* Add other attributes as needed */}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {peopleData.map((person, index) => (
              <tr key={person.name}>
                <td>{index + 1}</td>
                <td>
                  {person.name} {getSpeciesLogo(person.species)}
                </td>
                <td>{person.height}</td>
                <td>{person.gender}</td>
                <td>{person.mass}</td>
                <td>{person.hair_color}</td>
                <td>{person.skin_color}</td>
                <td>{person.eye_color}</td>
                <td>{person.birth_year}</td>
                <td>{person.homeworld}</td>
                <td>
                  {person.films.length > 0 ? (
                    person.films.map((v) => <p>{v}</p>)
                  ) : (
                    <p>Empty</p>
                  )}
                </td>
                <td>
                  {person.species.length > 0 ? (
                    person.species.map((v) => <p>{v}</p>)
                  ) : (
                    <p>Empty</p>
                  )}
                </td>
                <td>
                  {person.vehicles.length > 0 ? (
                    person.vehicles.map((v) => <p>{v}</p>)
                  ) : (
                    <p>Empty</p>
                  )}
                </td>
                <td>
                  {person.starships.length > 0 ? (
                    person.starships.map((v) => <p>{v}</p>)
                  ) : (
                    <p>Empty</p>
                  )}
                </td>
                <td>{person.created}</td>
                <td>{person.edited}</td>
                <td>{person.url}</td>

                {/* Add other attributes as needed */}
              </tr>
            ))}
          </tbody>
          <div className="my-2 d-flex justify-content-between gap-2">
            <button className="btn btn-primary" onClick={() => handlePage(1)}>
              1
            </button>
            <button className="btn btn-secondary" onClick={() => handlePage(2)}>
              2
            </button>

            <button className="btn btn-primary" onClick={() => handlePage(3)}>
              3
            </button>
            <button className="btn btn-secondary" onClick={() => handlePage(4)}>
              4
            </button>

            <button className="btn btn-primary" onClick={() => handlePage(5)}>
              5
            </button>
            <button className="btn btn-secondary" onClick={() => handlePage(6)}>
              6
            </button>
          </div>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
