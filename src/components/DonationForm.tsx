'use client';

import { useState } from 'react';

const predefinedAmounts = [10, 25, 50, 100];

export default function DonationForm() {
  const [amount, setAmount] = useState('25');
  const [frequency, setFrequency] = useState('one-time');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    console.log({
      amount: customAmount || amount,
      frequency,
      name,
      email,
      paymentMethod,
      isAnonymous,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Amount
        </label>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {predefinedAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              className={`py-2 px-4 rounded-lg border ${
                amount === amt.toString()
                  ? 'bg-gold text-white border-gold'
                  : 'border-gray-300 hover:border-gold'
              }`}
              onClick={() => {
                setAmount(amt.toString());
                setCustomAmount('');
              }}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className="mt-2">
          <input
            type="number"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount('custom');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
          />
        </div>
      </div>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frequency
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`py-2 px-4 rounded-lg border ${
              frequency === 'one-time'
                ? 'bg-gold text-white border-gold'
                : 'border-gray-300 hover:border-gold'
            }`}
            onClick={() => setFrequency('one-time')}
          >
            One-Time
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-lg border ${
              frequency === 'monthly'
                ? 'bg-gold text-white border-gold'
                : 'border-gray-300 hover:border-gold'
            }`}
            onClick={() => setFrequency('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
        >
          <option value="card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
            required={!isAnonymous}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
          />
          <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
            Make this donation anonymous
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gold text-white py-3 px-6 rounded-lg hover:bg-gold-dark transition-colors"
      >
        Complete Donation
      </button>
    </form>
  );
}
