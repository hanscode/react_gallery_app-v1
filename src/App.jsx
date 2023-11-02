import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PageNotFound from "./components/404";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("sunsets");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        // handle success
        if (activeFetch) {
          setPhotos(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });

    return () => {
      activeFetch = false;
    };
  }, [query]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <>
      <div className="container">
        <SearchForm changeQuery={handleQueryChange} />
        <Nav changeQuery={handleQueryChange} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate replace to="/sunsets" />} />
            <Route path="search/:query" element={<PhotoList data={photos} changeQuery={handleQueryChange} />} />
            <Route path=":topic" element={<PhotoList data={photos} changeQuery={handleQueryChange} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </>
  );
}
export default App;
