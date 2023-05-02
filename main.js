const { Expense } = require('./data/database');

        // Add a new expense to the database and update the total
        async function addExpense(name, amount) {
            await Expense.create({ name, amount });
            updateTotal();
            renderExpenses();
        }

        // Remove an expense from the database and update the total
        async function removeExpense(id) {
            await Expense.destroy({ where: { id } });
            updateTotal();
            renderExpenses();
        }

        // Update the total value of all expenses
        async function updateTotal() {
            const expenses = await Expense.findAll();
            const total = expenses.reduce((acc, cur) => acc + cur.amount, 0);
            totalExpense.textContent = total.toFixed(2);
        }

        // Render the list of expenses from the database to the page
        async function renderExpenses() {
            expensesList.innerHTML = '';
            const expenses = await Expense.findAll();
            expenses.forEach(expense => {
                const li = document.createElement('li');
                li.innerHTML = `${expense.name}: $${expense.amount} <button class="delete" data-id="${expense.id}">X</button>`;
                expensesList.appendChild(li);
            });
        }

        // Handle form submit event
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const name = inputName.value;
            const amount = parseFloat(inputAmount.value);
            await addExpense(name, amount);
            inputName.value = '';
            inputAmount.value = '';
        });

        // Handle delete button click event
        expensesList.addEventListener('click', async e => {
            if (e.target.matches('button.delete')) {
                const id = e.target.dataset.id;
                await removeExpense(id);
            }
        });
