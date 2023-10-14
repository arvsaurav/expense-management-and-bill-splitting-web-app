import { useState } from "react";
import "./ManageExpense.css";
import ShowPersonalExpense from "./ShowPersonalExpense";
import ShowSplittedBills from "./ShowSplittedBills";

function ManageExpense({userState}) {

    const [personalExpenseVisibility, setPersonalExpenseVisibility] = useState('none');
    const [splittedBillsVisibility, setSplittedBillsVisibility] = useState('none');

    const setVisibility = (id) => {
        if(id === "collapsible1") {
            if(personalExpenseVisibility === 'none') {
                setPersonalExpenseVisibility('block');
            }
            else {
                setPersonalExpenseVisibility('none');
            }
        }
        if(id === "collapsible2") {
            if(splittedBillsVisibility === 'none') {
                setSplittedBillsVisibility('block');
            }
            else {
                setSplittedBillsVisibility('none');
            }
        }
    }

    return (
        <div className="manage-expense-div">
            <h1>Manage Expense</h1>
            <div>
                <button className="collapsible" onClick={() => {setVisibility("collapsible1")}}>View Personal Expense</button>
                <div className="view-personal-expense" style={{display: `${personalExpenseVisibility}`}}>
                    <div className="content">
                        <ShowPersonalExpense userState={userState} />
                    </div>
                </div>
                <br/>
                <button className="collapsible" onClick={() => {setVisibility("collapsible2")}}>View Bills Splitted With Friends</button>
                <div className="view-bills-splitted-with-friends" style={{display: `${splittedBillsVisibility}`}}>
                    <div className="content">    
                        <ShowSplittedBills userState={userState} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageExpense;