import { useEffect, useState } from "react";
import "./Expense.css";
import { Pie, PieChart, Legend, ResponsiveContainer } from "recharts";

function ExpenseSoFar({expenses}) {

    const [allTimeExpense, setallTimeExpense] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [pieChartData, setPieChartData] = useState([]);
    const [colors] = useState(["#082567", "#1ca9c9", "#FEBE10", "#720e9e", "#7B3F00", "#008200", "#EF0107", "#818589"]);

    useEffect(() => {
        const allTimeExpenditureList = () => {
            let tempArr = [];
            let shoppingAmount, travelAmount, foodAmount,movieAmount, rentAmount, groceryAmount, fuelAmount, otherAmount;
            shoppingAmount = travelAmount = foodAmount = movieAmount = rentAmount = groceryAmount = fuelAmount = otherAmount = 0;
            expenses.shopping.forEach((obj) => {
                shoppingAmount += obj.amount;    
            });
            expenses.travel.forEach((obj) => {
                travelAmount += obj.amount;
            });
            expenses.food.forEach((obj) => {
                foodAmount += obj.amount;
            });
            expenses.movie.forEach((obj) => {
                movieAmount += obj.amount;
            });
            expenses.rent.forEach((obj) => {
                rentAmount += obj.amount;
            });
            expenses.grocery.forEach((obj) => {
                groceryAmount += obj.amount;
            });
            expenses.fuel.forEach((obj) => {
                fuelAmount += obj.amount;
            });
            expenses.others.forEach((obj) => {
                otherAmount += obj.amount;
            });
            tempArr.push(["Shopping", shoppingAmount]);
            tempArr.push(["Travel", travelAmount]);
            tempArr.push(["Food", foodAmount]);
            tempArr.push(["Movie", movieAmount]);
            tempArr.push(["Rent", rentAmount]);
            tempArr.push(["Grocery", groceryAmount]);
            tempArr.push(["Fuel", fuelAmount]);
            tempArr.push(["Others", otherAmount]);
            setallTimeExpense(tempArr);
        }
        allTimeExpenditureList();
    }, [expenses]);

    useEffect(() => {
        let count = 0;
        const data = allTimeExpense.map((expense) => {
            return (
                { name: expense[0], amount: expense[1], fill: colors[count++] }
            )
        });
        setPieChartData(data);
    }, [allTimeExpense, colors]);

    useEffect(() => {
        let amount = 0;
        allTimeExpense.forEach((expense) => {
            amount += expense[1];
        });
        setTotalAmount(amount);
    }, [allTimeExpense]);

    const renderCustomLabel = ({value}) => {
        // value is amount
        const angleOfSegment = (value/totalAmount)*360;
        const percentage = (angleOfSegment/360)*100;
        const displayText = percentage.toFixed(2) + "%";
        return (
            displayText
        )
    };

    return (
        <div id="expense-container-show-expense-div">
            {
                totalAmount === 0 &&
                <p>No expense to show.</p>
            }
            {  
                totalAmount !== 0 &&
                <h3>You have spent {totalAmount} rupees so far.</h3>
            }
            {
                totalAmount !== 0 &&
                allTimeExpense.filter((expense) => {
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
            {
                totalAmount !== 0 &&
                <ResponsiveContainer width='80%' height={400} style={{ margin: 'auto' }}>
                    <PieChart>
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Pie data={pieChartData} dataKey="amount" label={renderCustomLabel} outerRadius='75%' style={{outline: 'none'}} >
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            }
        </div>
    );
}

export default ExpenseSoFar;