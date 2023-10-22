import Calendar from "react-calendar";
import "./ExpenseBetweenTwoDates.css";
import { useEffect, useState } from "react";
import CalendarImage from "../../../images/calendar.png";

function ExpenseBetweenTwoDates({expenses}) {

    const [startDate, setStartDate] = useState(new Date());
    const [startDateString, setStartDateString] = useState('');
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [startDateCalendarVisibility, setStartDateCalendarVisibility] = useState("none");
    const startDateMinSelection = new Date(new Date().getFullYear()-1, 0, 1);
    const startDateMaxSelection = new Date();
    const [endDate, setEndDate] = useState(new Date());
    const [endDateString, setEndDateString] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [endDateCalendarVisibility, setEndDateCalendarVisibility] = useState("none");
    const endDateMinSelection = startDate;
    const endDateMaxSelection = new Date();
    const [expenseBetweenSelectedDates, setExpenseBetweenSelectedDates] = useState([]);
    const [categoryWiseTotalExpense, setCategoryWiseTotalExpense] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseCategory] = useState(["Shopping", "Travel", "Food", "Movie", "Rent", "Grocery", "Fuel", "Others"]);

    useEffect(() => {
        const dateArray = startDate.toString().split(" ");
        setStartDateString(`${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`);
    }, [startDate]);

    useEffect(() => {
        const dateArray = endDate.toString().split(" ");
        setEndDateString(`${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`);
    }, [endDate]);

    const calendarVisibilityToggle = (id) => {
        if(id === "start-date-calendar-button") {
            if(startDateCalendarVisibility === "none") {
                setStartDateCalendarVisibility("block");
            }
            else {
                setStartDateCalendarVisibility("none");
            }
        }
        if(id === "end-date-calendar-button") {
            if(endDateCalendarVisibility === "none") {
                setEndDateCalendarVisibility("block");
            }
            else {
                setEndDateCalendarVisibility("none");
            }
        }
    }

    useEffect(() => {
        const formattedDate = new Date(startDateString).toLocaleDateString({
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        setFormattedStartDate(formattedDate);
    }, [startDateString]);

    useEffect(() => {
        const formattedDate = new Date(endDateString).toLocaleDateString({
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        setFormattedEndDate(formattedDate);
    }, [endDateString]);

    useEffect(() => {
        const shoppingExpense = expenses.shopping.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const travelExpense = expenses.travel.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const foodExpense = expenses.food.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const movieExpense = expenses.movie.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const rentExpense = expenses.rent.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const groceryExpense = expenses.grocery.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const fuelExpense = expenses.fuel.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const otherExpense = expenses.others.filter((expense) => {
            const expenseDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                expenseDate >= formattedStartDate && expenseDate <= formattedEndDate   
            );
        }).map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString({
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            return (
                [
                    formattedDate,
                    expense.date,
                    expense.amount
                ]
            )
        })
        const expenseInRange = [shoppingExpense.sort(), travelExpense.sort(), foodExpense.sort(), movieExpense.sort(), rentExpense.sort(), groceryExpense.sort(), fuelExpense.sort(), otherExpense.sort()];
        setExpenseBetweenSelectedDates(expenseInRange);
    }, [expenses, formattedStartDate, formattedEndDate]);

    useEffect(() => {
        const categoryWiseTotalAmount = [];
        expenseBetweenSelectedDates.forEach((category) => {
            let totalAmount = 0;
            category.forEach((expense) => {
                totalAmount += expense[2];
            })
            categoryWiseTotalAmount.push(totalAmount);
        })
        setCategoryWiseTotalExpense(categoryWiseTotalAmount);
    }, [expenseBetweenSelectedDates]);

    useEffect(() => {
        let totalAmount = 0;
        categoryWiseTotalExpense.forEach((amount) => {
            totalAmount += amount;
        })
        setTotalExpense(totalAmount);
    }, [categoryWiseTotalExpense]);

    return (
        <div id="expense-between-two-dates-container-div"> 
            <div id="date-range-selector-div">
                <div id="start-date-div">
                    <label htmlFor="from">From</label>
                    <input id="from" readOnly value={startDateString} />
                    <button id="start-date-calendar-button" onClick={() => calendarVisibilityToggle("start-date-calendar-button")}>
                        <img alt="calendar button" src={CalendarImage} />
                    </button>
                    <div style={{display: `${startDateCalendarVisibility}`}}>
                        <Calendar id="from-calendar" value={startDate} onChange={setStartDate} onClickDay={() => setStartDateCalendarVisibility("none")} minDate={startDateMinSelection} maxDate={startDateMaxSelection} />
                    </div>
                </div>
                <div id="end-date-div">
                    <label htmlFor="to">To</label>
                    <input id="to" readOnly value={endDateString} />
                    <button id="end-date-calendar-button" onClick={() => calendarVisibilityToggle("end-date-calendar-button")}>
                        <img alt="calender button" src={CalendarImage} />
                    </button>
                    <div style={{display: `${endDateCalendarVisibility}`}}>
                        <Calendar id="to-calendar" value={endDate} onChange={setEndDate} onClickDay={() => setEndDateCalendarVisibility("none")} minDate={endDateMinSelection} maxDate={endDateMaxSelection} />
                    </div>
                </div>
            </div>
            <div id="expense-details-render-div"> 
                {
                    <h3>
                        You have spent Rs.{totalExpense} from {startDateString} to {endDateString}.
                    </h3>
                }
                {
                    expenseBetweenSelectedDates.map((category, index) => {
                        return (
                            <div id="expense-category-card" key={index}>
                                {
                                    <h3>
                                        { expenseCategory[index] }
                                    </h3>
                                }
                                <div>
                                    {
                                        categoryWiseTotalExpense[index] === 0 && 
                                        "No expense to show."
                                    }
                                </div>
                                <div id="expense-data-div">
                                    {
                                        categoryWiseTotalExpense[index] !== 0 &&
                                        category.map((expense, index) => {
                                            return (
                                                <div id="expense-date-amount" key={index}>
                                                    <div>{ expense[1] }</div>
                                                    <div>{ "->" } </div>
                                                    <div>Rs.{ expense[2] }</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div id="display-category-wise-total-amount-div">
                                    {
                                        categoryWiseTotalExpense[index] !== 0 &&
                                        `Total Amount = Rs.${categoryWiseTotalExpense[index]}`
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ExpenseBetweenTwoDates;