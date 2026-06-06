import React, { useEffect, useState } from "react";
import { supabase } from "../store/Superbase";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setTransactions(data);
  };

  const formatDateHeading = (dateString) => {
    const date = new Date(dateString);

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const heading = formatDateHeading(transaction.created_at);

    if (!acc[heading]) {
      acc[heading] = [];
    }

    acc[heading].push(transaction);

    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Transactions
        </h1>

        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="bg-white p-4 rounded-xl text-center">
            No Transactions Found
          </div>
        ) : (
          Object.entries(groupedTransactions).map(
            ([date, items]) => (
              <div key={date} className="mb-6">
                <h2 className="font-bold text-gray-500 mb-3">
                  {date}
                </h2>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm p-4 mb-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.user_name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-bold text-lg ${
                            item.transaction_type ===
                            "received"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.transaction_type ===
                          "received"
                            ? "+"
                            : "-"}
                          ₹{item.amount}
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(
                            item.created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default TransactionList;