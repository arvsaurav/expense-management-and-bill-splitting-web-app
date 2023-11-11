import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation, useNavigate } from "react-router";
import PersonalExpenseService from "../../services/PersonalExpenseService";
import "./AddExpense.css";
import Loader from "../Loader/Loader";

function AddExpense() {

    const [expenseType, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const [isPersonalExpense, setIsPersonalExpense] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    // minimum date is set to 1st Jan of last year
    const minDate = new Date(new Date().getFullYear()-1, 0, 1);
    // maximum date is set to today's date
    const maxDate = new Date();
    const [calendarButtonText, setCalendarButtonText] = useState('Show Calendar');
    const [calendarVisibility, setCalendarVisibility] = useState('hidden');
    const [displayType, setDisplayType] = useState('none');
    const [isLoadingObject, setIsLoadingObject] = useState({
        isLoading: false,
        pointerEvent: 'auto',
        opacity: '1'
    });
    const navigate = useNavigate();
    const location = useLocation();
    const userState = location.state.userState;

    useEffect(() => {
        // disabling scroll to change number in number input field
        const input = document.getElementById('amount');
        input.addEventListener('mousewheel',
            function(event) {
                this.blur();
            }
        );
        const dateArray = date.toString().split(" ");
        setDateString(`${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`);
        if(showCalendar) {
            setCalendarButtonText('Hide Calendar');
            setDisplayType('block');
            setCalendarVisibility('visible');
        }
        else {
            setCalendarButtonText('Change Date');
            setDisplayType('none');
            setCalendarVisibility('hidden');
        }
    }, [calendarVisibility, showCalendar, calendarButtonText, date, displayType]);

    const addPersonalExpense = async () => {
        try {
            setIsLoadingObject({
                isLoading: true,
                pointerEvent: 'none',
                opacity: '0.8'
            });
            const getAllExpenseOfCurrentExpenseType = await PersonalExpenseService.getExpenseByExpenseType(userState.email, expenseType);
            // check whether any expense already added on same date
            // if yes, sum both amounts
            // if no, push new expense object in the array
            let flag = false;
            const updatedExpenseListOfCurrentExpenseType = getAllExpenseOfCurrentExpenseType.map((expenseObject) => {
                if(expenseObject.date === dateString) {
                    expenseObject.amount = expenseObject.amount + parseInt(amount);
                    flag = true;
                }
                return expenseObject;
            });
            if(!flag) {
                updatedExpenseListOfCurrentExpenseType.push({
                    date: dateString,
                    amount: parseInt(amount)
                });
            }
            const doesExpenseListUpdatedSuccessfully = await PersonalExpenseService.updateExpenseById(userState.email, {
                [expenseType]: updatedExpenseListOfCurrentExpenseType
            });
            if(doesExpenseListUpdatedSuccessfully) {
                setIsLoadingObject({
                    isLoading: false,
                    pointerEvent: 'auto',
                    opacity: '1'
                });
                if(window.confirm("Expense added. Do you want to navigate to manage expense page?")) {
                    navigate('/expenses');
                }
            }
            else {
                alert("Something went wrong.");
            }
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const addGroupExpense = async () => {
        navigate('/selectfriends', {state: {userState: userState, expenseType: expenseType, amount: amount, dateString: dateString, redirectedFrom: location.state.redirectedFrom}});
    }

    const resetForm = () => {
        if(isPersonalExpense) {
            // resetting expense-type checkboxes
            document.getElementById(expenseType).checked = false;
            setAmount('');
            setIsPersonalExpense(false);
            setDate(new Date());
        }
    }

    const addExpense = async (event) => {
        try {
            event.preventDefault();
            if(isPersonalExpense) {
                await addPersonalExpense();
            }
            else {
                await addGroupExpense();
            }
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
        <div id="add-expense-div">
            <h1>Add Expense</h1>
            <form id="expense-form" onSubmit={addExpense}>
                <p>Select Expense Category :</p>
                <div id="select-expense-type-div">
                    <input type="radio" id="shopping" name="expense-type" required value={expenseType} onClick={() => setExpenseType("shopping")} />
                    <label htmlFor="shopping">Shopping</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="travel" name="expense-type" value={expenseType} onClick={() => setExpenseType("travel")} />
                    <label htmlFor="travel">Travel</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="food" name="expense-type" value={expenseType} onClick={() => setExpenseType("food")} />
                    <label htmlFor="food">Food</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="movie" name="expense-type" value={expenseType} onClick={() => setExpenseType("movie")} />
                    <label htmlFor="movie">Movie</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="rent" name="expense-type" value={expenseType} onClick={() => setExpenseType("rent")} />
                    <label htmlFor="rent">Rent</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="grocery" name="expense-type" value={expenseType} onClick={() => setExpenseType("grocery")} />
                    <label htmlFor="grocery">Grocery</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="fuel" name="expense-type" value={expenseType} onClick={() => setExpenseType("fuel")} />
                    <label htmlFor="fuel">Fuel</label>
                </div>
                <div id="select-expense-type-div">
                    <input type="radio" id="others" name="expense-type" value={expenseType} onClick={() => setExpenseType("others")} />
                    <label htmlFor="others">Others</label>
                </div>
                <div id="amount-and-date-div">
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" name="amount" style={{width: '255px'}} required value={amount} onChange={(event) => setAmount(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="date"  style={{marginRight: 31}}>Date</label>
                        <input id="date" name="date" style={{marginRight: 5}} required value={dateString} readOnly />
                        <input id="calendar-button" type="button" value={calendarButtonText} onClick={() => setShowCalendar(prev => !prev)} />
                        <div id="calendar-div" style={{ visibility: `${calendarVisibility}`, display: `${displayType}` }}>
                            <Calendar id="calendar" value={date} minDate={minDate} maxDate={maxDate} onChange={setDate} onClickDay={() => setShowCalendar(prev => !prev)} />
                        </div>
                    </div>
                </div>
                <div>
                    <input id="expense-submit-button" style={{pointerEvents: `${isLoadingObject.pointerEvent}`, opacity: `${isLoadingObject.opacity}`}} name="expense" type="submit" value="Add As Personal Expense" onClick={() => setIsPersonalExpense(true)} />
                    <input id="expense-submit-button" style={{pointerEvents: `${isLoadingObject.pointerEvent}`, opacity: `${isLoadingObject.opacity}`}} name="expense" type="submit" value="Split With Friends" onClick={() => setIsPersonalExpense(false)} />
                </div>
                <input id="cancel-button" style={{margin: 'auto', pointerEvents: `${isLoadingObject.pointerEvent}`, opacity: `${isLoadingObject.opacity}`}} type="button" value="Cancel" onClick={returnToPreviousPage} />
            </form>
            {
                isLoadingObject.isLoading && <Loader />
            }     
        </div>
    );
}

export default AddExpense;