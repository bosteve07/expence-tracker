const addExpenseBtn = document.querySelector(".add-expense-btn");
const expenseList = document.querySelector(".expense-list");
const totalExpense = document.querySelector(".total-expenses h3");

let expenses = [];
let total = 0;

function renderExpenses() {
    let html = "";
    expenses.forEach((expense, index) => { // Looping through expenses
        html += `
            <div class="expense-item"> 
                <div class="expense-item-description">${expense.description}</div>
                <div class="expense-item-amount">$${expense.amount}</div>
                <button class="delete-expense-btn" data-index="${index}">X</button>
            </div>
        `;
    });

    expenseList.innerHTML = html;
    totalExpense.innerText = `Total Expenses: $${total.toFixed(2)}`; // Ensure total is formatted to 2 decimal places
}

function addExpense() {
    const description = prompt("Enter Expense Description");
    const amount = parseFloat(prompt("Enter Expense Amount"));
    if (description && !isNaN(amount)) { // Added validation to check if amount is a valid number
        const expense = {
            description: description,
            amount: amount
        };
        expenses.push(expense);
        total += amount;
        renderExpenses();
    } else {
        alert("Please enter a valid description and amount."); // Alert if invalid input
    }
}

addExpenseBtn.addEventListener("click", addExpense);

function deleteExpense(index) { // Fixed spelling from "deleteExpence" to "deleteExpense"
    total -= expenses[index].amount;
    expenses.splice(index, 1); // Changed from slice to splice to properly remove the expense at the given index
    renderExpenses();
}

expenseList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-expense-btn")) {
        const index = Array.from(event.target.parentNode.parentNode.children)
            .indexOf(event.target.parentNode);
        deleteExpense(index); // Call the correctly spelled "deleteExpense" function
    }
});
