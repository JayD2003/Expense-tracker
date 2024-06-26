import {useAddTransaction} from '../../hooks/useAddTransaction';

export const ExpenseTracker = () => {

    const { addTransaction } = useAddTransaction();

    const onSubmit = (e) => {
        addTransaction({description: "Haircut",
            transcationAmount: 22, transactionType: "expense",
        });
    };

    return <>
    <div className="expense-tracker">
        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="balance">
                <h3>Your Balance</h3>
                <h2>$0.00</h2>
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>$0.00</p>
                </div>
                <div className="expenses">
                    <h4>expenses</h4>
                    <p>$0.00</p>
                </div>
            </div>
            <form className="add-transaction" onsSubmit={onSubmit}>
                <input type="text" placeholder="Description" required />
                <input type="number" placeholder="Amount" required />
                <input type="radio" id="expense" value="expense" />
                <label htmlFor="expense">Expense</label>
                <input type="radio" id="income" value="income" />
                <label htmlFor="income">Income</label>

                <button type="submit">Add Transaction</button>
            </form>
        </div>
    </div>
    <div className="transactions">
        <h3>Transaction</h3>
    </div>
    </>
}