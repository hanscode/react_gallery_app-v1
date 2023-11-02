import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Photo from "./Photo";
import NoPhotos from "./noPhotos";

const PhotoList = ({data, changeQuery}) => {
  let { topic, query } = useParams();
  const results = data;
  let photos;

  useEffect(()=> {
    if (topic) {
      changeQuery(topic);
    }
    if (query) {
      changeQuery(query);
    }
  });

  if (results.length > 0) {
    photos = results.map((photo) => {
      return (
        <Photo
          url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          title={photo.title}
          key={photo.id}
        />
      );
    });
  } else {
    photos = <NoPhotos />;
  }

  return (
    <div className="photo-container">
      <h2> { topic ? `${topic}` : query ? `Results for ${query}` : ''}</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
