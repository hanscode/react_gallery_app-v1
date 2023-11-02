import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="sunsets">Sunsets</NavLink></li>
      <li><NavLink to="dogs">Dogs</NavLink></li>
      <li><NavLink to="computers">Computers</NavLink></li>
    </ul>
  </nav>
);

export default Nav;