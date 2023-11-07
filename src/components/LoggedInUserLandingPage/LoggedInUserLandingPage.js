import './LoggedInUserLandingPage.css';

import { useLocation, useNavigate } from "react-router-dom";

function LoggedInUserLandingPage({userState}) {

    const navigate = useNavigate();
    const location = useLocation();

    const addFriend = () => {
        // passing user state and path location to AddFriend component while navigating to AddFriend component
        navigate('/addfriend', {state: {userState: userState, redirectedFrom: location.pathname}});
    }

    const addExpense = () => {
        navigate('/addexpense', {state: {userState: userState, redirectedFrom: location.pathname}});
    }

    return(
        <div className="container">
            <h1>Welcome to Split Bills.</h1>
            <p>Split Bills helps you manage expense and split bills with friends.</p>
            <button className="landing-page-buttons" type="submit" onClick={addExpense}>Add Expense</button>
            <button className="landing-page-buttons" type="submit" onClick={addFriend}>Add Friend</button>
        </div>
    );
}

export default LoggedInUserLandingPage;