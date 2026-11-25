# SpendWise — Interactive Budget Tracker

SpendWise is an interactive personal budgeting web application built with HTML, CSS, and vanilla JavaScript. Users can set a monthly budget, log categorized expenses, and receive real-time visual feedback on their spending habits directly on the dashboard.

---

## Improvements Made This Week

In Week 6, SpendWise evolved from a static/basic layout into a fully interactive web application:
- **Dynamic Expense Tracking:** Users can add multiple expenses with a title, amount, and category, as well as clear all entries with one click.
- **Custom Monthly Budget:** Added an interactive budget input that recalculates available funds and spending thresholds in real time.
- **Live Status Alerts:** Implemented color-coded feedback banners that warn users when they approach or exceed their budget.
- **On-Page Rendering:** Moved all output from the browser console directly onto a live, responsive dashboard.

---

## How Conditionals Are Used

Conditional statements (`if`, `else if`, and `else`) drive both input validation and budget evaluation:
- **Input Validation:** Before adding an expense or updating the budget, conditionals verify that titles are non-empty and numeric amounts are valid numbers greater than `0`.
- **Budget Status Evaluation:**
  - If `totalSpent > budget`, a danger alert notifies the user how much they are over budget.
  - Else if `totalSpent >= budget * 0.8`, a warning alert notifies the user that they have used **80%** or more of their budget.
  - Else, a confirmation alert indicates that spending is safely within budget.

---

## How Arrays Are Used to Store Data

Instead of storing each expense in separate individual variables, all records are stored in a single `expenses` array of objects:
```javascript
{
  id: 1732521600000,
  title: "Groceries",
  amount: 45.50,
  category: "Food"
}
