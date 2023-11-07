import { Link } from 'react-router-dom';
import './Navbar.css';

function CustomNavbar({userState}) {

    const nameArray = userState.name.split(" ");
    const firstName = nameArray[0];

    return (
        <div>
            <ul className='navUl'>
                <li className='navFirstLi' style={{float: 'left', marginLeft: '-10px'}}>
                    <p> Hello, {firstName}! </p>
                </li>
                <li className='navLi' style={{marginLeft: '20px', marginRight: '30px'}}>
                    <Link to='/logout'><p>Logout</p></Link>
                </li>
                <li className='navLi'>
                    <Link to='/expenses'><p>My Expense</p></Link>
                </li>
                <li className='navLi'>
                    <Link to='/friends'><p>Friends</p></Link>
                </li>
                <li className='navLi'>
                    <Link to='/landingPage'><p>Home</p></Link>
                </li>
            </ul>
        </div>
    );
}

export default CustomNavbar;