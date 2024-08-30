'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Transaction } from './types';
import { api } from './services/api';
import styles from './home.module.css';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [addAmount, setAddAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getProfile();
        setUser(userData);
        
        const transactionsData = await api.getTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login');
      }
    };
    
    fetchData();
  }, [router]);

  const addToBalance = async (amount: number) => {
    try {
      await api.addToBalance(amount);
      const updatedUserData = await api.getProfile();
      setUser(updatedUserData);
      setAddAmount('');
    } catch (error) {
      console.error('Error adding to balance:', error);
    }
  };

  const createTransaction = async (amount: number, receiverId: number) => {
    try {
      const newTransaction = await api.createTransaction(amount, receiverId);
      setTransactions([...transactions, newTransaction]);

      // Update the user profile after making a transaction
      const updatedUserData = await api.getProfile();
      setUser(updatedUserData);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Money Transfer App</h1>
        <button onClick={handleLogout} className="btn">Logout</button>
      </header>
      <main>
        <section className={styles.userInfo}>
          <h2>Welcome, {user.username}</h2>
          {/* <p>Role: {user.role}</p> */}
          <p>Balance: {user.balance.amount}</p>
        </section>
        <section className={styles.addBalance}>
          <h3>Add Money to Balance</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            addToBalance(parseFloat(addAmount));
          }}>
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Amount to add"
              required
              className="input"
              step="1"
              min="10"
            />
            <button type="submit" className="btn">Add to Balance</button>
          </form>
        </section>
        <section className={styles.transactions}>
          <h3>Transactions</h3>
          <ul className={styles.transactionList}>
            {transactions.map(transaction => (
              <li key={transaction.id} className={styles.transactionItem}>
                Amount: ${transaction.amount} - Status: {transaction.status}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.createTransaction}>
          <h3>Create Transaction</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
            const receiver = parseInt((form.elements.namedItem('receiver') as HTMLInputElement).value);
            createTransaction(amount, receiver);
          }}>
            <input type="number" name="amount" placeholder="Amount" required className="input" />
            <input type="number" name="receiver" placeholder="Receiver ID" required className="input" />
            <button type="submit" className="btn">Send Money</button>
          </form>
        </section>
      </main>
    </div>
  );
}