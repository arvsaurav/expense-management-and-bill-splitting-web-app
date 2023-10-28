import { useEffect, useState } from "react";
import PersonalExpenseService from "../../services/PersonalExpenseService";
import "./ShowPersonalExpense.css";
import TodaysExpense from "./ShowPersonalExpenseCategory/TodaysExpense";
import ExpenseSoFar from "./ShowPersonalExpenseCategory/ExpenseSoFar";
import ExpenseBetweenTwoDates from "./ShowPersonalExpenseCategory/ExpenseBetweenTwoDates";

function ShowPersonalExpense({userState, expenseDate, setExpenseDate, buttonColors, setButtonColors}) {

    const [expenses, setExpenses] = useState({});

    useEffect(() => {
        try {
            const getAllExpenses = async () => {
                const myExpenses = await PersonalExpenseService.getExpenseById(userState.email);
                setExpenses(myExpenses);
            }
            getAllExpenses();
        }
        catch {
            alert("Something went wrong.");
        }
    }, [userState]);

    return (
        <div>
            <div id="view-personal-expense-buttons">
                <button onClick={() => {setExpenseDate("today"); setButtonColors(["rgb(199, 202, 205)", "rgb(232, 239, 245)", "rgb(232, 239, 245)"]);}} style={{backgroundColor: `${buttonColors[0]}`}}>Today's Expense</button>
                <button onClick={() => {setExpenseDate("betweenTwoDates"); setButtonColors(["rgb(232, 239, 245)", "rgb(199, 202, 205)", "rgb(232, 239, 245)"]);}} style={{backgroundColor: `${buttonColors[1]}`}}>Expense Between Two Dates</button>
                <button onClick={() => {setExpenseDate("soFar"); setButtonColors(["rgb(232, 239, 245)", "rgb(232, 239, 245)", "rgb(199, 202, 205)"]);}} style={{backgroundColor: `${buttonColors[2]}`}}>Expenses So Far</button>  
            </div>
            <div>
                {
                    expenseDate === "today" && <TodaysExpense expenses={expenses} />
                }
                {
                    expenseDate === "betweenTwoDates" && <ExpenseBetweenTwoDates expenses={expenses} />
                }
                {
                    expenseDate === "soFar" && <ExpenseSoFar expenses={expenses} />
                }
            </div>
        </div>      
    );
}

export default ShowPersonalExpense;