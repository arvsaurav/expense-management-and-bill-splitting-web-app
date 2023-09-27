import { Link } from 'react-router-dom';
import './Navbar.css';

function CustomNavbar({userState}) {

    const nameArray = userState.name.split(" ");
    const firstName = nameArray[0];

    return (
        <div>
            <ul className='navUl'>
                <li className='navLi' style={{float: 'left'}}>
                    <p> Welcome, {firstName}! </p>
                </li>
                <li className='navLi' style={{marginRight: '1.5vw'}}>
                    <Link to='/logout'>Logout</Link>
                </li>
                {/* <li className='navLi'>
                    <Link to="/">My profile</Link>
                </li> */}
            </ul>
        </div>
    );
}

export default CustomNavbar;