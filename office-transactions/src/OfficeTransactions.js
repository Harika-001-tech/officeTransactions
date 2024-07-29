import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { getTransactions } from './RestAPI';

const OfficeTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const getMappedTransactions = () => {
    if (!transactions.length) return [];
    const mappedTransactions = transactions.map(x => x);
    for (let i = 0; i < mappedTransactions.length; i++) {
      mappedTransactions[i].Credit = mappedTransactions[i].Type === "credit" ? mappedTransactions[i].Amount : 0;
      mappedTransactions[i].Debit = mappedTransactions[i].Type === "debit" ? mappedTransactions[i].Amount : 0;
      if (i === 0) {
        mappedTransactions[i].Balance = mappedTransactions[i].Credit;
      } else {
        mappedTransactions[i].Balance = mappedTransactions[i - 1].Balance + mappedTransactions[i].Credit - mappedTransactions[i].Debit;
      }
    }
    const reversed = mappedTransactions.map(x => x).reverse();
    return reversed;
  };

  useEffect(() => {
    async function getData() {
      const transactionsFromDb = await getTransactions();
      setTransactions(transactionsFromDb);
    }

    getData();
  }, [setTransactions]);

  const transactionsUpdated = getMappedTransactions();
  console.log("reverse,", transactionsUpdated);

  return (
    <div className="App">

      <table className='transaction-table'>
        <thead>
          <tr>
            <th>Office Transactions</th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Link to="/newtransaction">
                <button type="button" className="btn-redirect">+ Add Transaction</button>
              </Link>
            </th>
          </tr>

          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionsUpdated.map((transaction, index) => (
            <tr key={index}>
              <td>
                {transaction.Date}
              </td>
              <td>
                {transaction.Description}
              </td>
              <td>
                {transaction.Credit}
              </td>
              <td>
                {transaction.Debit}
              </td>
              <td>
                {transaction.Balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default OfficeTransactions;
