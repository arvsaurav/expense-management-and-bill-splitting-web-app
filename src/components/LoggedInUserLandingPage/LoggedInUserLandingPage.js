import './LoggedInUserLandingPage.css';

import { useNavigate } from "react-router-dom";

function LoggedInUserLandingPage({userState}) {

    const navigate = useNavigate();

    const addFriend = () => {
        // passing user state to AddFriend component while navigating to AddFriend component
        navigate('/addfriend', {state: userState});
    }

    return(
        <div className="container">
            <h1>Welcome to Split Bills!</h1>
            <h3>Split Bills helps you manage expense and split bills with friends.</h3>
            <button className="button" type="submit">Add Expense</button>
            <button className="button" type="submit" onClick={addFriend}>Add Friend</button>
        </div>
    );
}

export default LoggedInUserLandingPage;