import './Navbar.css';

function Navbar() {
    return (
        <div>
            <ul className='navUl'>
                <li className='navLi' style={{float: 'left'}}>Home</li>
                <li className='navLi' style={{marginRight: '1.5vw'}}>Login</li>
                <li className='navLi'>Register</li>
            </ul>
        </div>
    );
}

export default Navbar;