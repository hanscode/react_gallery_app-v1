import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Importing App Components
import Photo from "./Photo";
import NoPhotos from "./noPhotos";

/**
 * 
 * @param {string} slug - The static url slug for each topic.
 * @param {array of objects} data - The data comprises the details of photos retrieved from the main App component.
 * @param {function} changeQuery - This function invokes the state-modifying function `setQuery()` within the App component. 
  
 }}
 * @returns 
 */

const PhotoList = ({ slug, data, changeQuery }) => {
  let { query } = useParams();
  let topic = slug;
  const results = data;
  let photos;

  // Using the useEffect Hooks to synchronize the `PhotoList` component when changes occur in the query variable. 
  useEffect(() => {
    if (query) {
      changeQuery(query);
    } else {
      changeQuery(topic);
    }
  });

  // Verifying whether the data array provided is empty or not.
  if (results.length > 0) {
    photos = results.map((photo) => {
      return (
        <Photo
          // Implements the URL construction process from Flickr.
          url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          title={photo.title}
          key={photo.id}
        />
      );
    });
  } else {
    // Render the NotFound component if no data is provided.
    photos = <NoPhotos />;
  }

  return (
    <div className="photo-container">
      <h2> {topic ? `${topic}` : query ? `Results for ${query}` : ""}</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
