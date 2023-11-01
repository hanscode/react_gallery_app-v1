import Photo from "./Photo";
import NoPhotos from "./noPhotos";

const PhotoList = (props) => {
  const results = props.data;
  let photos;

  if (results.length > 0) {
    photos = results.map((photo) => {
      return (
        <Photo
          url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          key={photo.id}
        />
      );
    });
  } else {
    photos = <NoPhotos />;
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
