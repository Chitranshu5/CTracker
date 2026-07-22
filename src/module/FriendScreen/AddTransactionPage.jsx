// // AddTransactionPage.jsx
// import React, { useState } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

// const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Other'];

// const AddTransactionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const initialType = searchParams.get('type') === 'receive' ? 'receive' : 'give';

//   const [type, setType] = useState(initialType);
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState(categories[0]);
//   const [description, setDescription] = useState('');

//   const handleSave = () => {
//     if (!amount) return;

//     const newTransaction = {
//       friend_id: id,
//       type,
//       category,
//       description,
//       amount: Number(amount),
//       date: new Date().toISOString(), // current date & time, taken automatically
//     };

//     // TODO: replace with useMutation → supabase.from('transactions').insert(newTransaction)
//     console.log('Saving transaction:', newTransaction);

//     navigate(`/friends/${id}`);
//   };

//   return (
//     <div className="relative w-full h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">

//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-4 flex-shrink-0 shadow-sm">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 active:scale-95 transition flex-shrink-0"
//           >
//             <span className="text-lg">←</span>
//           </button>
//           <div>
//             <p className="text-xs font-semibold text-indigo-400 tracking-wide">Add transaction</p>
//             <h1 className="text-lg font-bold text-gray-800">
//               {type === 'give' ? 'You Gave' : 'You Got'}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-8 space-y-5">

//         {/* Type toggle */}
//         <div className="flex bg-gray-100 rounded-xl p-1">
//           <button
//             onClick={() => setType('give')}
//             className={`flex-1 text-sm font-semibold py-2 rounded-lg transition ${
//               type === 'give' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500'
//             }`}
//           >
//             You Gave
//           </button>
//           <button
//             onClick={() => setType('receive')}
//             className={`flex-1 text-sm font-semibold py-2 rounded-lg transition ${
//               type === 'receive' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500'
//             }`}
//           >
//             You Got
//           </button>
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="text-xs font-semibold text-gray-500 mb-1 block">Amount</label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
//             <input
//               type="number"
//               placeholder="0"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full pl-7 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="text-xs font-semibold text-gray-500 mb-1 block">Category</label>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setCategory(cat)}
//                 className={`text-xs font-medium px-3 py-1.5 rounded-full transition ${
//                   category === cat
//                     ? 'bg-indigo-500 text-white'
//                     : 'bg-white text-gray-600 border border-gray-200'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="text-xs font-semibold text-gray-500 mb-1 block">Description</label>
//           <input
//             type="text"
//             placeholder="What's this for?"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
//           />
//         </div>

//         {/* Save button — sits right under description, in normal flow */}
//         <button
//           onClick={handleSave}
//           disabled={!amount}
//           className={`w-full py-3 rounded-xl text-sm font-semibold transition active:scale-95 ${
//             amount
//               ? type === 'give' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
//               : 'bg-gray-200 text-gray-400'
//           }`}
//         >
//           Save transaction
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddTransactionPage;
// AddTransactionPage.jsximport 



import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFriends } from '../../hooks/useFriends';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { CATEGORIES } from '../../constants/Colors';

const AddTransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'received' ? 'received' : 'gave';

  const { data: friends = [] } = useFriends();
  const friend = friends.find((f) => String(f.id) === id);

  const { mutate: saveTransaction, isPending: saving, error: saveError } = useAddTransaction(id);

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount || !friend) return;

    saveTransaction(
      {
        user_id: id,
        transaction_type: type,
        category,
        description,
        amount: Number(amount),
        is_settled:false,
      },
      { onSuccess: () => navigate(`/friends/${id}`) }
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-4 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 active:scale-95 transition flex-shrink-0"
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <p className="text-xs font-semibold text-indigo-400 tracking-wide">Add transaction</p>
            <h1 className="text-lg font-bold text-gray-800">
              {type === 'gave' ? 'You Gave' : 'You Got'}
              {friend ? ` — ${friend.name}` : ''}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-8 space-y-5">

        {/* Type toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setType('gave')}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition ${
              type === 'gave' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            You Gave
          </button>
          <button
            onClick={() => setType('received')}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition ${
              type === 'received' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            You Got
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-7 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category — horizontal scroll */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Category</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl border flex-shrink-0 transition active:scale-95 ${
                  category === cat.name
                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-[11px] font-medium whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Description</label>
          <input
            type="text"
            placeholder="What's this for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        {saveError && <p className="text-xs text-red-500">Something went wrong saving this transaction. Try again.</p>}

        <button
          onClick={handleSave}
          disabled={!amount || saving}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition active:scale-95 ${
            amount && !saving
              ? type === 'gave' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {saving ? 'Saving...' : 'Save transaction'}
        </button>
      </div>
    </div>
  );
};

export default AddTransactionPage;