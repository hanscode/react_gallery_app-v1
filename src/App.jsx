import React, { useEffect, useState } from "react";
import apiKey from './config';
import PhotoList from "./components/PhotoList";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";

function App() {
  const [photos, setPhotos] = useState([]);
  //const [query, setQuery] = useState("coding");

  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => setPhotos(responseData.photos.photo))
      .catch(error => console.log("Error fetching and parsing data", error));
  },[]);
  return (
    <>
      <div className="container">
        <SearchForm />
        <Nav />
        <PhotoList data={photos} />
      </div>
    </>
  )
}

export default App
