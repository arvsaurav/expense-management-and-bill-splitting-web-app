import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div>
            <ul className='navUl'>
                <li className='navLi' style={{float: 'left', marginLeft: '-10px'}}>
                    <Link to='/'><p>Home</p></Link>
                </li>
                <li className='navLi' style={{marginRight: '30px'}}>
                    <Link to='/login'><p>Login</p></Link>
                </li>
                <li className='navLi'>
                    <Link to="/register"><p>Register</p></Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;