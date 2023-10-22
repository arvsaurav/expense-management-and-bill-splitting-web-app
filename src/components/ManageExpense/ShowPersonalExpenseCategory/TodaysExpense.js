import { useEffect, useState } from "react";
import "./Expense.css";

function TodaysPersonalExpense({expenses}) {

    const [todaysExpense, setTodaysExpense] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const todaysExpenditureList = () => {
            let tempArr = [];
            const date = new Date();
            const dateArray = date.toString().split(" ");
            const dateString = dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
            let shoppingAmount, travelAmount, foodAmount,movieAmount, rentAmount, groceryAmount, fuelAmount, otherAmount;
            shoppingAmount = travelAmount = foodAmount = movieAmount = rentAmount = groceryAmount = fuelAmount = otherAmount = 0;
            expenses.shopping.forEach((obj) => {
                if(obj.date === dateString) {
                    shoppingAmount = obj.amount;
                    return;
                }
            });
            expenses.travel.forEach((obj) => {
                if(obj.date === dateString) {
                    travelAmount = obj.amount;
                    return;
                }
            });
            expenses.food.forEach((obj) => {
                if(obj.date === dateString) {
                    foodAmount = obj.amount;
                    return;
                }
            });
            expenses.movie.forEach((obj) => {
                if(obj.date === dateString) {
                    movieAmount = obj.amount;
                    return;
                }
            });
            expenses.rent.forEach((obj) => {
                if(obj.date === dateString) {
                    rentAmount = obj.amount;
                    return;
                }
            });
            expenses.grocery.forEach((obj) => {
                if(obj.date === dateString) {
                    groceryAmount = obj.amount;
                    return;
                }
            });
            expenses.fuel.forEach((obj) => {
                if(obj.date === dateString) {
                    fuelAmount = obj.amount;
                    return;
                }
            });
            expenses.others.forEach((obj) => {
                if(obj.date === dateString) {
                    otherAmount = obj.amount;
                    return;
                }
            });
            tempArr.push(["Shopping", shoppingAmount]);
            tempArr.push(["Travel", travelAmount]);
            tempArr.push(["Food", foodAmount]);
            tempArr.push(["Movie", movieAmount]);
            tempArr.push(["Rent", rentAmount]);
            tempArr.push(["Grocery", groceryAmount]);
            tempArr.push(["Fuel", fuelAmount]);
            tempArr.push(["Others", otherAmount]);
            setTodaysExpense(tempArr);
        }
        todaysExpenditureList();
    }, [expenses]);

    useEffect(() => {
        let amount = 0;
        todaysExpense.forEach((expense) => {
            amount += expense[1];
        });
        setTotalAmount(amount);
    }, [todaysExpense]);

    return (
        <div id="expense-container-show-expense-div">
            {
                totalAmount === 0 &&
                <p>No expense to show.</p>
            }
            {  
                totalAmount !== 0 &&
                <h3>Today you have spent {totalAmount} rupees.</h3>
            }
            {
                totalAmount !== 0 &&
                todaysExpense.filter((expense) => {
                    return (
                        expense[1] !== 0
                    );
                })
                .map((expense, index) => {
                    return (
                        <div key={index} id="each-category-expense-div">
                            {expense[1]} rupees on {expense[0]}
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TodaysPersonalExpense;