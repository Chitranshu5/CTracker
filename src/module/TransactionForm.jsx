import React, { useState } from "react";
import { supabase } from "../store/Superbase";

export default function TransactionForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    transactionType: "gave",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_name: formData.userName,
          transaction_type: formData.transactionType,
          amount: Number(formData.amount),
          description: formData.description,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    console.log("Saved Transaction:", data);

    setSuccessMessage("✅ Transaction Saved Successfully!");

    setFormData({
      userName: "",
      transactionType: "gave",
      amount: "",
      description: "",
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Expense Tracker
            </h1>
            <p className="text-gray-500 mt-2">
              Add your transaction details
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-center font-medium">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>

              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="gave">💸 Gave Money</option>
                <option value="received">💰 Received Money</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="₹ Enter amount"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Save Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}