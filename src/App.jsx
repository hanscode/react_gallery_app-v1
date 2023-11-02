import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import apiKey from "./config";

// Importing the App Components
import PhotoList from "./components/PhotoList";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PageNotFound from "./components/404";

/**
 * This `App()` function is the main container component.
 */
function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("404");
  const [loading, setLoading] = useState(true);

  // The useEffect hook is useful to execute on initial rendering and when changes occur in the query variable.
  useEffect(() => {
    setLoading(true);

    // The variable `activeFetch` will track of which data fetch is the latest.
    let activeFetch = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        // handle success
        if (activeFetch) {
          // If activeFetch is `true`, then update the `setPhotos` state with the `photos` data.
          setPhotos(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });

    /**
     * useEffect hooks clean up function to run before the next function is called.
     * That is to say, before fetching the next set of photos, the `activeFetch` is set to false, so that a new 
     * local `activeFetch` variable is declared, and a new fetch is called.
     */
    return () => {
      activeFetch = false;
    };
  }, [query]);

  /**
   * The function `handleQueryChange` executes the state modifier for the query parameter.
   * @param {string} searchText 
   */
  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  /**
   * The code snippets below will respond by displaying each user-requested UI component based on the URL.
   */
  return (
    <>
      <div className="container">
        {/* Hide the `Nav` and `SearchForm` components if the `query` term is `404` (the value by default), 
        which it means that the `PageNotFound` component is rendered.*/}
        {query !== '404' ? (
          <>
            <SearchForm changeQuery={handleQueryChange} />
            <Nav changeQuery={handleQueryChange} />
          </>
        ) : (
          <>{/* Don't load the Nav and SearchForm components */}</>
        )}

        {/* if the photos is actively being fetched, show "Loading..."; otherwise, exhibit the results. */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate replace to="/sunsets" />} />
            <Route path="search/:query" element={<PhotoList data={photos} changeQuery={handleQueryChange} />} />

            <Route path="sunsets" element={<PhotoList data={photos} changeQuery={handleQueryChange} slug='sunsets' />} />
            <Route path="dogs" element={<PhotoList data={photos} changeQuery={handleQueryChange} slug='dogs' />} />
            <Route path="computers" element={<PhotoList data={photos} changeQuery={handleQueryChange} slug='computers' />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </>
  );
}
export default App;
