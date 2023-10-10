import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation, useNavigate } from "react-router";

function AddExpense() {

    const [expenseType, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const [isPersonalExpense, setIsPersonalExpense] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarButtonText, setCalendarButtonText] = useState('Show Calendar');
    const [calendarVisibility, setCalendarVisibility] = useState('hidden');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const dateArray = date.toString().split(" ");
        setDateString(`${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`);
        if(showCalendar) {
            setCalendarButtonText('Hide Calendar');
            setCalendarVisibility('visible');
        }
        else {
            setCalendarButtonText('Change Date');
            setCalendarVisibility('hidden');
        }
    }, [calendarVisibility, showCalendar, calendarButtonText, date]);

    const addPersonalExpense = async () => {
        alert("personal expense");
        // to be implemented
    }

    const addGroupExpense = async () => {
        alert("group expense");
        // to be implemented
    }

    const resetForm = () => {
        // resetting expense-type checkboxes
        const expenseTypeArray = document.getElementsByName("expense-type");
        expenseTypeArray.forEach((expense) => {
            expense.checked = false;
        });
        setAmount('');
        setIsPersonalExpense(false);
        setDate(new Date());
    }

    const addExpense = async (event) => {
        try {
            event.preventDefault();
            isPersonalExpense ? await addPersonalExpense() : await addGroupExpense();
            resetForm();
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const returnToPreviousPage = () => {
        navigate('..'+location.state.redirectedFrom);
    }

    return (
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={addExpense}>
                <p>Select Expense Category :</p>
                <input type="radio" id="shopping" name="expense-type" required value={expenseType} onClick={() => setExpenseType("shopping")} />
                <label htmlFor="shopping">Shopping</label>
                <br/>
                <input type="radio" id="travel" name="expense-type" value={expenseType} onClick={() => setExpenseType("travel")} />
                <label htmlFor="travel">Travel</label>
                <br/>
                <input type="radio" id="food" name="expense-type" value={expenseType} onClick={() => setExpenseType("food")} />
                <label htmlFor="food">Food</label>
                <br/>
                <input type="radio" id="movie" name="expense-type" value={expenseType} onClick={() => setExpenseType("movie")} />
                <label htmlFor="movie">Movie</label>
                <br/>
                <input type="radio" id="rent" name="expense-type" value={expenseType} onClick={() => setExpenseType("rent")} />
                <label htmlFor="rent">Rent</label>
                <br/>
                <input type="radio" id="grocery" name="expense-type" value={expenseType} onClick={() => setExpenseType("grocery")} />
                <label htmlFor="grocery">Grocery</label>
                <br/>
                <input type="radio" id="fuel" name="expense-type" value={expenseType} onClick={() => setExpenseType("fuel")} />
                <label htmlFor="fuel">Fuel</label>
                <br/>
                <input type="radio" id="others" name="expense-type" value={expenseType} onClick={() => setExpenseType("others")} />
                <label htmlFor="others">Others</label>
                <br/>
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required value={amount} onChange={(event) => setAmount(event.target.value)} />
                <div>
                    <label htmlFor="date" >Date</label>
                    <input id="date" name="date" required value={dateString} readOnly />
                    <input id="calendar-button" type="button" value={calendarButtonText} onClick={() => setShowCalendar(prev => !prev)} />
                    <div style={{ visibility: `${calendarVisibility}` }}>
                        <Calendar id="calendar" value={date} onChange={setDate} onClickDay={() => setShowCalendar(prev => !prev)} />
                    </div>
                </div>
                <br/>
                <input id="submit-button" name="expense" type="submit" value="Add As Personal Expense" onClick={() => setIsPersonalExpense(true)} />
                <input id="submit-button" name="expense" type="submit" value="Split With Friends" onClick={() => setIsPersonalExpense(false)} />
                <input id="cancel-button" type="button" value="Cancel" onClick={returnToPreviousPage} />
            </form>
        </div>
    );
}

export default AddExpense;