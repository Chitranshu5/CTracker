// // FriendDetailPage.jsx
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const allFriends = [
//   { id: '1', name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7', balance: -1200, direction: 'owes', phone: '+91 98765 43210', email: 'arjun@example.com' },
//   { id: '2', name: 'Priya', initials: 'PR', bgColor: '#E1F5EE', textColor: '#0F6E56', balance: 800, direction: 'owed', phone: '+91 98765 43211', email: 'priya@example.com' },
//   { id: '3', name: 'Karan', initials: 'KA', bgColor: '#FAECE7', textColor: '#993C1D', balance: -600, direction: 'owes', phone: '+91 98765 43212', email: 'karan@example.com' },
//   { id: '4', name: 'Divya', initials: 'DV', bgColor: '#FBEAF0', textColor: '#993556', balance: -1400, direction: 'owes', phone: '+91 98765 43213', email: 'divya@example.com' },
//   { id: '5', name: 'Rohan', initials: 'RH', bgColor: '#E0F7FA', textColor: '#00695C', balance: 500, direction: 'owed', phone: '+91 98765 43214', email: 'rohan@example.com' },
//   { id: '6', name: 'Sneha', initials: 'SN', bgColor: '#FCE4EC', textColor: '#880E4F', balance: -300, direction: 'owes', phone: '+91 98765 43215', email: 'sneha@example.com' },
// ];

// const dummyTransactions = [
//   { id: 't1', type: 'give', category: 'Food', description: 'Dinner at Barbeque Nation', amount: 850, date: '2026-07-10' },
//   { id: 't2', type: 'receive', category: 'Rent', description: 'Room rent share', amount: 2050, date: '2026-07-05' },
//   { id: 't3', type: 'give', category: 'Travel', description: 'Cab split', amount: 300, date: '2026-06-28' },
// ];

// const FriendDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const friend = allFriends.find(f => f.id === id);

//   const formatBalance = (balance) => {
//     const absBalance = Math.abs(balance);
//     return balance > 0 ? `+₹${absBalance}` : `-₹${absBalance}`;
//   };

//   if (!friend) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
//         <p className="text-gray-500 text-sm">Friend not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">

//       {/* Header with glassmorphism */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-5 flex-shrink-0 shadow-sm">
//         <div className="flex items-center gap-3 mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 active:scale-95 transition flex-shrink-0"
//           >
//             <span className="text-lg">←</span>
//           </button>
//           <p className="text-xs font-semibold text-indigo-400 tracking-wide">Friend details</p>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md ring-2 ring-white flex-shrink-0"
//             style={{ backgroundColor: friend.bgColor, color: friend.textColor }}>
//             {friend.initials}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h1 className="text-xl font-bold text-gray-800">{friend.name}</h1>
//             <p className="text-xs text-gray-500 truncate">{friend.email}</p>
//             <p className="text-xs text-gray-500">{friend.phone}</p>
//           </div>
//         </div>

//         {/* Balance summary */}
//         <div className={`mt-4 rounded-xl p-4 flex items-center justify-between ${friend.direction === 'owes' ? 'bg-orange-50' : 'bg-emerald-50'}`}>
//           <span className="text-sm text-gray-600">
//             {friend.direction === 'owes' ? `${friend.name} owes you` : `You owe ${friend.name}`}
//           </span>
//           <span className={`text-lg font-bold ${friend.direction === 'owes' ? 'text-orange-600' : 'text-emerald-600'}`}>
//             {formatBalance(friend.balance)}
//           </span>
//         </div>

//         {/* Quick actions */}
//         <div className="flex gap-2 mt-3">
//           <button
//             onClick={() => navigate(`/friends/${friend.id}/add-transaction?type=give`)}
//             className="flex-1 text-xs font-semibold text-white bg-orange-500 py-2 rounded-lg active:scale-95 transition"
//           >
//             You Gave
//           </button>
//           <button
//             onClick={() => navigate(`/friends/${friend.id}/add-transaction?type=receive`)}
//             className="flex-1 text-xs font-semibold text-white bg-emerald-500 py-2 rounded-lg active:scale-95 transition"
//           >
//             You Got
//           </button>
//         </div>
//       </div>

//       {/* Transaction history */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">
//         <h2 className="text-sm font-semibold text-gray-700 mb-3">Transaction history</h2>
//         <div className="space-y-3">
//           {dummyTransactions.length === 0 ? (
//             <div className="text-center py-12">
//               <span className="text-5xl mb-3 block">🧾</span>
//               <p className="text-gray-500 text-sm">No transactions yet</p>
//             </div>
//           ) : (
//             dummyTransactions.map((tx) => (
//               <div key={tx.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
//                 <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${tx.type === 'give' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
//                   {tx.type === 'give' ? '↑' : '↓'}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-800 truncate">{tx.description}</p>
//                   <p className="text-xs text-gray-500">{tx.category} · {tx.date}</p>
//                 </div>
//                 <span className={`text-sm font-bold ${tx.type === 'give' ? 'text-orange-600' : 'text-emerald-600'}`}>
//                   {tx.type === 'give' ? '-' : '+'}₹{tx.amount}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="h-16"></div>
//     </div>
//   );
// };

// export default FriendDetailPage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../store/Superbase";

const FriendDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const friend = location.state?.friend;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Friend Object:", friend);
  console.log("Friend ID (user_id):", friend?.id);

  useEffect(() => {
    if (friend?.id) {
      fetchTransactions(friend.id);
    }
  }, [friend]);

  const formatBalance = (balance) => {
    const absBalance = Math.abs(balance);
    return balance > 0 ? `+₹${absBalance}` : `-₹${absBalance}`;
  };

  const fetchTransactions = async (userId) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    console.log("Friend ID:", userId);
    console.log("Transactions:", data);

    setTransactions(data);
    setLoading(false);
  };

  
  const balance = transactions.reduce((total, tx) => {
    if (tx.transaction_type === "gave") {
      return total + Number(tx.amount);
    }

    if (tx.transaction_type === "received") {
      return total - Number(tx.amount);
    }

    return total;
  }, 0);

  const direction = balance >= 0 ? "owes" : "owed";

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Header with glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-5 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 active:scale-95 transition flex-shrink-0"
          >
            <span className="text-lg">←</span>
          </button>

          <p className="text-xs font-semibold text-indigo-400 tracking-wide">
            Friend details
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md ring-2 ring-white flex-shrink-0"
            style={{
              backgroundColor: friend.bgColor,
              color: friend.textColor,
            }}
          >
            {friend.initials}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800">{friend.name}</h1>

            <p className="text-xs text-gray-500 truncate">{friend.email}</p>

            <p className="text-xs text-gray-500">{friend.phone}</p>
          </div>
        </div>

        {/* Balance summary */}
        <div
          className={`mt-4 rounded-xl p-4 flex items-center justify-between ${
            direction === "owes" ? "bg-orange-50" : "bg-emerald-50"
          }`}
        >
          <span className="text-sm text-gray-600">
            {direction === "owes"
              ? `${friend.name} owes you`
              : `You owe ${friend.name}`}
          </span>

          <span
            className={`text-lg font-bold ${
              direction === "owes" ? "text-orange-600" : "text-emerald-600"
            }`}
          >
            {formatBalance(balance)}
          </span>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() =>
              navigate(`/friends/${friend.id}/add-transaction?type=gave`)
            }
            className="flex-1 text-xs font-semibold text-white bg-orange-500 py-2 rounded-lg active:scale-95 transition"
          >
            You Gave
          </button>

          <button
            onClick={() =>
              navigate(`/friends/${friend.id}/add-transaction?type=received`)
            }
            className="flex-1 text-xs font-semibold text-white bg-emerald-500 py-2 rounded-lg active:scale-95 transition"
          >
            You Got
          </button>
        </div>
      </div>

      {/* Empty body for future transaction list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Transaction history
        </h2>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-3 block">🧾</span>
              <p className="text-gray-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    tx.transaction_type === "gave"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {tx.transaction_type === "gave" ? "↑" : "↓"}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {tx.description || "No description"}
                  </p>
                  <p className="text-xs text-gray-500">{tx.category} .</p>

                  <p className="text-xs text-gray-500">
                    {new Date(tx.created_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

                <span
                  className={`text-sm font-bold ${
                    tx.transaction_type === "gave"
                      ? "text-orange-600"
                      : "text-emerald-600"
                  }`}
                >
                  {tx.transaction_type === "gave" ? "-" : "+"}₹{tx.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default FriendDetailPage;
