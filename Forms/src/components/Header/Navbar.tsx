import { links } from '../../constants';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to={links.home}>Home</Link>
        </li>
        <li>
          <Link to={links.reactHookForm}>React Hook Horm</Link>
        </li>
        <li>
          <Link to={links.uncontrolledForm}>Uncontolled Form</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
