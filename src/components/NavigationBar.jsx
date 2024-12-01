import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="clearfix">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/browse-characters" className={({ isActive }) => isActive ? 'active' : ''}>Browse Characters</NavLink>
      <NavLink to="/comics" className={({ isActive }) => isActive ? 'active' : ''}>Comics</NavLink>
    </nav>
  );
}

export default NavigationBar;
