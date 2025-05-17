/* File: script.js */
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let filterDate = "";
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (desc && !isNaN(amount) && date) {
    expenses.push({ desc, amount, date });
    saveAndUpdate();
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
  } else {
    alert("Please fill all fields correctly.");
  }
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    saveAndUpdate();
  }
}

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById("desc").value = exp.desc;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("date").value = exp.date;
  deleteExpense(index);
}

function saveAndUpdate() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateList();
}

function filterExpenses() {
  filterDate = document.getElementById("filter-date").value;
  updateList();
}

function clearFilter() {
  filterDate = "";
  document.getElementById("filter-date").value = "";
  updateList();
}

function updateList() {
  list.innerHTML = "";
  let total = 0;
  expenses.forEach((exp, index) => {
    if (!filterDate || exp.date === filterDate) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${exp.desc} - ₹${exp.amount} <small>(${exp.date})</small></span>
        <button class='edit-btn' onclick='editExpense(${index})'>Edit</button>
        <button class='delete-btn' onclick='deleteExpense(${index})'>Delete</button>`;
      list.appendChild(li);
      total += exp.amount;
    }
  });
  totalDisplay.textContent = total.toFixed(2);
}

updateList();