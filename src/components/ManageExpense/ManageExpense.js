import { useState } from "react";
import "./ManageExpense.css";
import ShowPersonalExpense from "./ShowPersonalExpense";
import ShowSplittedBills from "./ShowSplittedBills";
import DownIcon from "../../images/caret-down-solid.svg";
import UpIcon from "../../images/caret-up-solid.svg";

function ManageExpense({userState}) {

    const [personalExpenseVisibility, setPersonalExpenseVisibility] = useState('none');
    const [splittedBillsVisibility, setSplittedBillsVisibility] = useState('none');
    const [iconPersonalExpense, setIconPersonalExpense] = useState(DownIcon);
    const [iconSplittedBills, setIconSplittedBills] = useState(DownIcon);
    // today's personal expense, last month's or so far personal expense
    const [expenseDate, setExpenseDate] = useState("");
    const [buttonColors, setButtonColors] = useState(["rgb(232, 239, 245)", "rgb(232, 239, 245)", "rgb(232, 239, 245)"]);

    const setVisibility = (id) => {
        if(id === "collapsible1") {
            if(personalExpenseVisibility === 'none') {
                setIconPersonalExpense(UpIcon);
                setPersonalExpenseVisibility('block');
                setButtonColors(["rgb(232, 239, 245)", "rgb(232, 239, 245)", "rgb(232, 239, 245)"]);
            }
            else {
                setIconPersonalExpense(DownIcon);
                setPersonalExpenseVisibility('none');
                setExpenseDate("");
            }
        }
        if(id === "collapsible2") {
            if(splittedBillsVisibility === 'none') {
                setIconSplittedBills(UpIcon);
                setSplittedBillsVisibility('block');
            }
            else {
                setIconSplittedBills(DownIcon);
                setSplittedBillsVisibility('none');
            }
        }
    }

    return (
        <div className="manage-expense-div">
            <h1>Manage Expense</h1>
            <div>
                <button className="collapsible" onClick={() => {setVisibility("collapsible1")}}>
                    View Personal Expense 
                    <img id="up-down-icon" alt="icon" src={iconPersonalExpense} />
                </button>
                <div className="view-personal-expense" style={{display: `${personalExpenseVisibility}`}}>
                    <div className="content">
                        <ShowPersonalExpense userState={userState} expenseDate={expenseDate} setExpenseDate={setExpenseDate} buttonColors={buttonColors} setButtonColors={setButtonColors} />
                    </div>
                </div>
                <br/>
                <button className="collapsible" onClick={() => {setVisibility("collapsible2")}}>
                    View Bills Splitted With Friends
                    <img id="up-down-icon" alt="icon" src={iconSplittedBills} />
                </button>
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