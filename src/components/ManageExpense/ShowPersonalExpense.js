import { useEffect, useState } from "react";
import PersonalExpenseService from "../../services/PersonalExpenseService";
import "./ShowPersonalExpense.css";
import TodaysExpense from "./ShowPersonalExpenseCategory/TodaysExpense";
import ExpenseSoFar from "./ShowPersonalExpenseCategory/ExpenseSoFar";
import ExpenseBetweenTwoDates from "./ShowPersonalExpenseCategory/ExpenseBetweenTwoDates";

function ShowPersonalExpense({userState, expenseDate, setExpenseDate}) {

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
                <button onClick={() => setExpenseDate("today")}>Today's Expense</button>
                <button onClick={() => setExpenseDate("betweenTwoDates")}>Expense Between Two Dates</button>
                <button onClick={() => setExpenseDate("soFar")}>Expenses So Far</button>  
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