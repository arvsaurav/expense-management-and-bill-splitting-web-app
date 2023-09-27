import "../Login/Login.css"
import { useEffect } from "react";

function Logout({userState, setUserState}) {

    useEffect(() => {
        const logoutUser = () => {
            setUserState({
                'doesUserLoggedIn': false,
                'email': '',
                'name': ''
            });
        }
        if(userState.doesUserLoggedIn) {
            logoutUser();
        }
    }, [userState, setUserState]);

    return(
        <div className='logoutDiv'>
            <h1>Logged out successfully.</h1>
            Hope to see you soon.
        </div>
    );
}

export default Logout;