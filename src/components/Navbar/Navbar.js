import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div>
            <ul className='navUl'>
                <li className='navLi' style={{float: 'left'}}>
                    <Link to='/'>Home</Link>
                </li>
                <li className='navLi' style={{marginRight: '1.5vw'}}>
                    <Link to='/login'>Login</Link>
                </li>
                <li className='navLi'>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;