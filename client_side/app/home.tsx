'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Transaction } from './types';
import { api } from './services/api';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [addAmount, setAddAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getProfile();
        setUser(userData);

        const transactions = await api.getTransactions();
        setTransactions(transactions);

        const pendingTransactions: Transaction[] = transactions.filter(transaction => transaction.status === 'PENDING')
        setPendingTransactions(pendingTransactions);
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

      const updatedUserData = await api.getProfile();
      setUser(updatedUserData);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const acceptTransaction = async (transactionId: number) => {
    try {
      await api.acceptTransaction(transactionId);
      
      // Refresh pending transactions
      const transactions = await api.getTransactions();
      setTransactions(transactions);

      // const pendingTransactions: Transaction[] = transactions.filter(transaction => transaction.status === 'PENDING')
      // setPendingTransactions(pendingTransactions);

      // Refresh user data
      const updatedUserData = await api.getProfile();
      setUser(updatedUserData);

      // Refresh transactions
      const transactionsData = await api.getTransactions();
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error accepting transaction:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  if (!user) {
    return <p className="text-center text-lg mt-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Money Transfer App</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.username}</h2>
          <p className="text-lg">Balance: ${user.balance.amount}</p>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add Money to Balance</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            addToBalance(parseFloat(addAmount));
          }} className="flex gap-4">
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Amount to add"
              required
              className="flex-grow border rounded p-2"
              step="1"
              min="10"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add to Balance
            </button>
          </form>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Transactions</h3>
          <ul className="space-y-2">
            {transactions.map(transaction => {
              const isSender = transaction.sender === user.id;
              const isReceiver = transaction.receiver === user.id;
          
              return (
                <div key={transaction.id} className="">
                  {isSender && !isReceiver && transaction.status === "PENDING" && (
                    <li key={transaction.id} className="border-b pb-2">
                      <div className="flex items-center justify-between pb-4">
                        <p>Sent <span className="font-bold">${transaction.amount}</span> to <span className="font-bold">{transaction.receiver_username}</span></p>
                        <button 
                            // onClick={}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded cursor-not-allowed opacity-50 w-30"                      disabled={true}
                          >
                            Pending
                          </button>
                      </div>
                    </li>
                  )}
                  {isReceiver && !isSender && transaction.status === "PENDING" && (
                    <li key={transaction.id} className="border-b pb-2">
                      <div className="flex items-center justify-between pb-4">
                        <p>Received <span className="font-bold">${transaction.amount}</span> from <span className="font-bold">{transaction.sender_username}</span></p>
                        <button 
                          onClick={() => acceptTransaction(transaction.id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-7 rounded w-30"
                        >
                          Accept
                        </button>
                      </div>
                    </li>
                  )}
                  { transaction.status === "COMPLETED" && (
                    <li key={transaction.id} className="border-b pb-2">
                      <div className="flex items-center justify-between pb-4">
                        <p>Received <span className="font-bold">${transaction.amount}</span> from <span className="font-bold">{transaction.sender_username}</span></p>
                        <button 
                          // onClick={() => acceptTransaction(transaction.id)}
                          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-30 cursor-not-allowed"
                        >
                          Completed
                        </button>
                      </div>
                    </li>
                  )}
                </div>
              );
            })}
          </ul>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Create Transaction</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
            const receiver = parseInt((form.elements.namedItem('receiver') as HTMLInputElement).value);
            createTransaction(amount, receiver);
          }} className="space-y-4">
            <input type="number" name="amount" placeholder="Amount" required className="w-full border rounded p-2" />
            <input type="number" name="receiver" placeholder="Receiver ID" required className="w-full border rounded p-2" />
            <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-full">
              Send Money
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}