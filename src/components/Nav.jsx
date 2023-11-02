import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  const handleClick = (e) => {
    // set the button text to the new query
    props.changeQuery(e.target.innerText);
};
 return (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="cats" onClick={(e) => handleClick(e)}>Cats</NavLink></li>
      <li><NavLink to="dogs" onClick={(e) => handleClick(e)}>Dogs</NavLink></li>
      <li><NavLink to="computers" onClick={(e) => handleClick(e)}>Computers</NavLink></li>
    </ul>
  </nav>
);
 }

export default Nav;