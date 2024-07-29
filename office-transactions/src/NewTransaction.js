import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Link } from "react-router-dom";
import { addTransaction } from './RestAPI';

const NewTransaction = () => {
  const [type, setTransactionType] = useState('debit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      type,
      amount: +amount,
      description
    };
    await addTransaction(transactionData);
    navigate("/");
  };

  return (
    <div className="new-transaction">
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-actions">

          <button type="submit" onClick={handleSubmit} className="btn-save">Save</button>
          <Link to="/">
            <button type="button" className="btn-cancel">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewTransaction;
