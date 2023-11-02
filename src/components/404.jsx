import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div className="photo-container">
      <h3>Page Not Found</h3>
      <p>Oops! Looks like you followed a bad link.</p>
      <Link to="/">Go to the home page</Link>
    </div>
  );
  
  export default PageNotFound;