let monthlyBudget = 500;
let expenses = []; // Array of expense objects

const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetDisplay = document.getElementById("budgetDisplay");
const totalSpentDisplay = document.getElementById("totalSpentDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");
const statusAlert = document.getElementById("statusAlert");
const expenseForm = document.getElementById("expenseForm");
const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const clearExpensesBtn = document.getElementById("clearExpensesBtn");
const expenseList = document.getElementById("expenseList");

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function calculateTotalSpent(expenseArray) {
  let total = 0;
  for (let i = 0; i < expenseArray.length; i++) {
    total += expenseArray[i].amount;
  }
  return total;
}

function evaluateBudgetStatus(totalSpent, budget) {
  if (budget <= 0) {
    return { message: "Set a budget greater than 0 to track spending.", className: "warn" };
  }

  if (totalSpent > budget) {
    const overBy = totalSpent - budget;
    return {
      message: `Over budget by ${formatMoney(overBy)}! Review your expenses.`,
      className: "danger"
    };
  } else if (totalSpent >= budget * 0.8) {
    return {
      message: "Warning: You have used 80% or more of your budget.",
      className: "warn"
    };
  } else {
    return {
      message: "You are within your budget.",
      className: "ok"
    };
  }
}

function renderDashboard() {
  const totalSpent = calculateTotalSpent(expenses);
  const remaining = monthlyBudget - totalSpent;

  budgetDisplay.textContent = formatMoney(monthlyBudget);
  totalSpentDisplay.textContent = formatMoney(totalSpent);
  remainingDisplay.textContent = formatMoney(remaining);

  const status = evaluateBudgetStatus(totalSpent, monthlyBudget);
  statusAlert.textContent = status.message;
  statusAlert.className = `alert ${status.className}`;

  expenseList.innerHTML = "";

  for (const item of expenses) {
    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <span><strong>${item.title}</strong> (${item.category})</span>
      <span>${formatMoney(item.amount)}</span>
    `;
    expenseList.appendChild(li);
  }
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = expenseTitle.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (!title || Number.isNaN(amount) || amount <= 0) {
    return;
  }

  expenses.push({
    id: Date.now(),
    title,
    amount,
    category
  });

  renderDashboard();
  expenseForm.reset();
  expenseTitle.focus();
});

setBudgetBtn.addEventListener("click", function () {
  const newBudget = parseFloat(budgetInput.value);
  if (!Number.isNaN(newBudget) && newBudget > 0) {
    monthlyBudget = newBudget;
    renderDashboard();
  }
});

clearExpensesBtn.addEventListener("click", function () {
  expenses = [];
  renderDashboard();
});

renderDashboard();
