import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div className="photo-container">
      <h1>Page Not Found</h1>
      <p>Oops! Looks like you followed a bad link.</p>
      <Link to="/">Go to the home page</Link>
      <img src="/404.png" style={{
          width:'300px',
          height:'378px',
          display: 'block',
          textAlign: 'center',
          margin: '30px auto'
        }} />
    </div>
  );
  
  export default PageNotFound;