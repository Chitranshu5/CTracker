// // HomePage.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const friends = [
//   { id: '1', name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7', balance: '-₹1,200', direction: 'owes' },
//   { id: '2', name: 'Priya', initials: 'PR', bgColor: '#E1F5EE', textColor: '#0F6E56', balance: '+₹800', direction: 'owed' },
//   { id: '3', name: 'Karan', initials: 'KA', bgColor: '#FAECE7', textColor: '#993C1D', balance: '-₹600', direction: 'owes' },
//   { id: '4', name: 'Divya', initials: 'DV', bgColor: '#FBEAF0', textColor: '#993556', balance: '-₹1,400', direction: 'owes' },
// ];

// const transactions = [
//   { id: 't1', friend: { name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7' }, description: 'Dinner at Buhari', type: 'give', amount: 600, date: 'Today, 7pm', category: '🍽️' },
//   { id: 't2', friend: { name: 'Priya', initials: 'PR', bgColor: '#E1F5EE', textColor: '#0F6E56' }, description: 'Movie tickets', type: 'recv', amount: 800, date: 'Yesterday', category: '🎬' },
//   { id: 't3', friend: { name: 'Karan', initials: 'KA', bgColor: '#FAECE7', textColor: '#993C1D' }, description: 'Auto fare', type: 'give', amount: 150, date: 'Yesterday', category: '🚗' },
//   { id: 't4', friend: { name: 'Divya', initials: 'DV', bgColor: '#FBEAF0', textColor: '#993556' }, description: 'Groceries', type: 'give', amount: 1400, date: 'Mon', category: '🛒' },
//   { id: 't5', friend: { name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7' }, description: 'Petrol split', type: 'give', amount: 600, date: 'Sun', category: '⛽' },
// ];

// const HomePage = () => {
//   const navigate = useNavigate();

//   const totalGiven = 4200;
//   const totalReceived = 1800;
//   const netBalance = totalReceived - totalGiven;

//   return (
//     <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">

//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-3 flex-shrink-0 shadow-sm">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs font-semibold text-indigo-400 tracking-wide">Good morning ✨</p>
//             <h1 className="text-xl font-bold text-gray-800">Chinu</h1>
//           </div>
//           <div className="relative">
//             <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
//               CH
//             </div>
//             <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
//           </div>
//         </div>
//       </div>

//       {/* Scrollable content */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">

//         {/* Summary Cards */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
//             <div className="flex items-center justify-between mb-1">
//               <p className="text-xs font-medium text-gray-500">Given</p>
//               <span className="text-orange-400 text-lg">↑</span>
//             </div>
//             <p className="text-2xl font-bold text-orange-600">₹{totalGiven.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
//             <div className="flex items-center justify-between mb-1">
//               <p className="text-xs font-medium text-gray-500">Received</p>
//               <span className="text-emerald-400 text-lg">↓</span>
//             </div>
//             <p className="text-2xl font-bold text-emerald-600">₹{totalReceived.toLocaleString()}</p>
//           </div>
//           <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium text-indigo-100">Net balance</p>
//                 <p className="text-2xl font-bold text-white">₹{Math.abs(netBalance).toLocaleString()}</p>
//                 <p className="text-xs text-indigo-100 mt-0.5">{netBalance >= 0 ? 'You are owed' : 'You owe'}</p>
//               </div>
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                 <span className="text-2xl">💰</span>
//               </div>
//             </div>
//           </div>
//         </div>



//         {/* Friends Section */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
//               <span>👥</span> Friends
//             </h2>
//             <button
//               onClick={() => navigate('/add-friend')}
//               className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full active:scale-95 transition"
//             >
//               + Add
//             </button>
//           </div>
//           <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
//             {friends.map((friend) => (
//               <div
//                 key={friend.id}
//                 onClick={() => navigate(`/friends/${friend.id}`)}
//                 className="flex flex-col items-center gap-2 flex-shrink-0 group active:scale-95 transition cursor-pointer"
//               >
//                 <div className="relative">
//                   <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold shadow-md ring-2 ring-white transition-transform group-hover:scale-105"
//                     style={{ backgroundColor: friend.bgColor, color: friend.textColor }}>
//                     {friend.initials}
//                   </div>
//                   <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${friend.direction === 'owes' ? 'bg-orange-400' : 'bg-emerald-400'}`}></div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">{friend.name}</span>
//                 <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${friend.direction === 'owes' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
//                   {friend.balance}
//                 </span>
//               </div>
//             ))}
//             <div
//               onClick={() => navigate('/add-friend')}
//               className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95 transition"
//             >
//               <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
//                 +
//               </div>
//               <span className="text-sm text-gray-400">Add</span>
//             </div>
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
//               <span>📋</span> Recent
//             </h2>
//             <button className="text-xs font-medium text-indigo-500">See all →</button>
//           </div>
//           <div className="space-y-2">
//             {transactions.map((txn) => (
//               <div key={txn.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0"
//                   style={{ backgroundColor: txn.friend.bgColor, color: txn.friend.textColor }}>
//                   {txn.friend.initials}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-1">
//                     <span className="text-sm font-semibold text-gray-800">{txn.friend.name}</span>
//                     <span className="text-xs text-gray-400">{txn.category}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 truncate">{txn.description}</p>
//                   <p className="text-[10px] text-gray-400 mt-0.5">{txn.date}</p>
//                 </div>
//                 <div className={`text-base font-bold ${txn.type === 'give' ? 'text-orange-500' : 'text-emerald-500'}`}>
//                   {txn.type === 'give' ? `-₹${txn.amount}` : `+₹${txn.amount}`}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../../hooks/useFriends';
import { useFriendsWithBalances } from '../../hooks/useFriendsWithBalances';

const transactions = [
  { id: 't1', friend: { name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7' }, description: 'Dinner at Buhari', type: 'give', amount: 600, date: 'Today, 7pm', category: '🍽️' },
  { id: 't2', friend: { name: 'Priya', initials: 'PR', bgColor: '#E1F5EE', textColor: '#0F6E56' }, description: 'Movie tickets', type: 'recv', amount: 800, date: 'Yesterday', category: '🎬' },
  { id: 't3', friend: { name: 'Karan', initials: 'KA', bgColor: '#FAECE7', textColor: '#993C1D' }, description: 'Auto fare', type: 'give', amount: 150, date: 'Yesterday', category: '🚗' },
  { id: 't4', friend: { name: 'Divya', initials: 'DV', bgColor: '#FBEAF0', textColor: '#993556' }, description: 'Groceries', type: 'give', amount: 1400, date: 'Mon', category: '🛒' },
  { id: 't5', friend: { name: 'Arjun', initials: 'AJ', bgColor: '#EEEDFE', textColor: '#534AB7' }, description: 'Petrol split', type: 'give', amount: 600, date: 'Sun', category: '⛽' },
];

const HomePage = () => {
  const navigate = useNavigate();
const { data: friends = [], isLoading, error } = useFriendsWithBalances();
console.log('[HomePage] render — friends count:', friends.length, 'isLoading:', isLoading);

  const totalGiven = 4200;
  const totalReceived = 1800;
  const netBalance = totalReceived - totalGiven;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-indigo-400 tracking-wide">Good morning ✨</p>
            <h1 className="text-xl font-bold text-gray-800">Chinu</h1>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              CH
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-500">Given</p>
              <span className="text-orange-400 text-lg">↑</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">₹{totalGiven.toLocaleString()}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-500">Received</p>
              <span className="text-emerald-400 text-lg">↓</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">₹{totalReceived.toLocaleString()}</p>
          </div>
          <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-indigo-100">Net balance</p>
                <p className="text-2xl font-bold text-white">₹{Math.abs(netBalance).toLocaleString()}</p>
                <p className="text-xs text-indigo-100 mt-0.5">{netBalance >= 0 ? 'You are owed' : 'You owe'}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Friends Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <span>👥</span> Friends
            </h2>
            <button
              onClick={() => navigate('/add-friend')}
              className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full active:scale-95 transition"
            >
              + Add
            </button>
          </div>

          {isLoading && (
            <p className="text-xs text-gray-400 py-4">Loading friends…</p>
          )}

          {error && (
            <p className="text-xs text-red-500 py-4">{error.message}</p>
          )}

          {!isLoading && !error && (
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => navigate(`/friends/${friend.id}`)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 group active:scale-95 transition cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold shadow-md ring-2 ring-white transition-transform group-hover:scale-105"
                      style={{ backgroundColor: friend.bgColor, color: friend.textColor }}>
                      {friend.initials}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${friend.direction === 'owes' ? 'bg-orange-400' : 'bg-emerald-400'}`}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{friend.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${friend.direction === 'owes' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {friend.balance}
                  </span>
                </div>
              ))}
              <div
                onClick={() => navigate('/add-friend')}
                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95 transition"
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
                  +
                </div>
                <span className="text-sm text-gray-400">Add</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <span>📋</span> Recent
            </h2>
            <button className="text-xs font-medium text-indigo-500">See all →</button>
          </div>
          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0"
                  style={{ backgroundColor: txn.friend.bgColor, color: txn.friend.textColor }}>
                  {txn.friend.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-800">{txn.friend.name}</span>
                    <span className="text-xs text-gray-400">{txn.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{txn.description}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{txn.date}</p>
                </div>
                <div className={`text-base font-bold ${txn.type === 'give' ? 'text-orange-500' : 'text-emerald-500'}`}>
                  {txn.type === 'give' ? `-₹${txn.amount}` : `+₹${txn.amount}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;