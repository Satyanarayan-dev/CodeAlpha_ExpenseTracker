const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const expensesTableBody = document.querySelector("#expenses tbody");
const totalExpenses = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expensesTableBody.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${expense.description}</td>
          <td>$${expense.amount}</td>
          <td>${expense.date}</td>
          <td class="expense-item-actions">
              <i class="fas fa-edit" onclick="editExpense(${index})"></i>
              <i class="fas fa-trash-alt" onclick="deleteExpense(${index})"></i>
          </td>
      `;
    expensesTableBody.appendChild(row);

    total += parseFloat(expense.amount);
  });

  totalExpenses.textContent = `Total Expenses: $${total.toFixed(2)}`;
}

renderExpenses();

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = amountInput.value;
  const date = dateInput.value;

  if (
    description.trim() === "" ||
    amount.trim() === "" ||
    date.trim() === ""
  ) {
    alert("Please provide valid description, amount, and date.");
    return;
  }

  const newExpense = {
    description,
    amount,
    date,
  };

  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();

  descriptionInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
});

function editExpense(index) {
  const editedDescription = prompt("Enter edited description:");
  const editedAmount = prompt("Enter edited amount:");
  const editedDate = prompt("Enter edited date (YYYY-MM-DD):");

  if (editedDescription && editedAmount && editedDate) {
    expenses[index].description = editedDescription;
    expenses[index].amount = editedAmount;
    expenses[index].date = editedDate;

    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
}

function deleteExpense(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this expense?"
  );

  if (confirmDelete) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
}
