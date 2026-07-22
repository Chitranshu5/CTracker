
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../../store/Superbase";
// import { useFriends } from "../../hooks/useFriends";
// import { CATEGORIES } from "../../constants/Colors";

// const fetchTransactionById = async (id) => {
//   const { data, error } = await supabase
//     .from("transactions")
//     .select("*")
//     .eq("id", id)
//     .single();
//     console.log("Resulting transacctions as per ID:",data);

//   if (error) throw error;
//   return data;
// };

// const useTransaction = (id) =>
//   useQuery({
//     queryKey: ["transaction", id],
//     queryFn: () => fetchTransactionById(id),
//     enabled: !!id,
//   });

// const TransactionDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: transaction,
//     isLoading: txnLoading,
//     isError: txnError,
//   } = useTransaction(id);

//   const { data: friends = [], isLoading: friendsLoading } = useFriends();

//   const isLoading = txnLoading || friendsLoading;

//   if (isLoading) {
//     return (
//       <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
//         <p className="text-sm text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   if (txnError || !transaction) {
//     return (
//       <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col items-center justify-center gap-4">
//         <p className="text-sm text-gray-500">No transaction data found.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200/60"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const {
//     amount,
//     transaction_type,
//     category,
//     description,
//     created_at,
//     user_id,
//   } = transaction;

//   const friend = friends.find((f) => String(f.id) === String(user_id));

//   const categoryData = CATEGORIES.find((c) => c.name === category) || {
//     icon: "📦",
//     name: "Other",
//   };

//   const isGave = transaction_type === "gave";
//   const formattedAmount = isGave ? `-₹${amount}` : `+₹${amount}`;
//   const directionText = isGave ? "You gave" : "You received";
//   const directionColor = isGave ? "text-orange-600" : "text-emerald-600";
//   const bgColor = isGave ? "bg-orange-50" : "bg-emerald-50";
//   const borderColor = isGave ? "border-orange-200" : "border-emerald-200";

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
//       {/* Decorative blobs */}
//       <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
//       <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>

//       {/* Header */}
//       <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/40 px-5 pt-5 pb-4 flex-shrink-0 shadow-sm shadow-indigo-100/30">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 rounded-full bg-indigo-50/80 backdrop-blur-sm flex items-center justify-center text-indigo-600 active:scale-90 transition-all duration-200 hover:bg-indigo-100/80 flex-shrink-0 shadow-sm"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <div>
//             <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
//               Transaction Details
//             </p>
//             <h1 className="text-xl font-bold text-gray-800 tracking-tight">Details</h1>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto px-5 pt-6 pb-8 space-y-6 relative">
//         {/* Main Amount Card */}
//         <div
//           className={`relative overflow-hidden rounded-2xl p-6 ${bgColor} border ${borderColor} shadow-sm flex flex-col items-center justify-center gap-2 transition-all`}
//         >
//           <span className="text-sm font-medium text-gray-500">{directionText}</span>
//           <span className={`text-4xl font-bold ${directionColor}`}>
//             {formattedAmount}
//           </span>
//           {description && (
//             <span className="text-sm text-gray-600 mt-1">{description}</span>
//           )}
//           {/* Decorative icon */}
//           <div className="absolute -top-8 -right-8 text-8xl opacity-10 select-none pointer-events-none">
//             {isGave ? "↑" : "↓"}
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-sm divide-y divide-gray-100/80 overflow-hidden">
//           {/* Category */}
//           <div className="flex items-center justify-between px-5 py-4">
//             <span className="text-sm text-gray-500 flex items-center gap-2">
//               <span className="text-lg">📂</span> Category
//             </span>
//             <span className="text-sm font-medium text-gray-800">
//               {categoryData.icon} {categoryData.name}
//             </span>
//           </div>

//           {/* Friend */}
//           <div className="flex items-center justify-between px-5 py-4">
//             <span className="text-sm text-gray-500 flex items-center gap-2">
//               <span className="text-lg">👤</span> Friend
//             </span>
//             <span className="text-sm font-medium text-gray-800">{friend?.name}</span>
//           </div>

//           {/* Date & Time */}
//           <div className="flex items-center justify-between px-5 py-4">
//             <span className="text-sm text-gray-500 flex items-center gap-2">
//               <span className="text-lg">🕒</span> Date & Time
//             </span>
//             <span className="text-sm font-medium text-gray-800">
//               {new Date(created_at).toLocaleString("en-IN", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </span>
//           </div>

//           {/* Transaction ID */}
//           <div className="flex items-center justify-between px-5 py-4">
//             <span className="text-sm text-gray-500 flex items-center gap-2">
//               <span className="text-lg">🔖</span> Transaction ID
//             </span>
//             <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
//               #{id.slice(0, 8)}
//             </span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex-1 text-sm font-semibold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200/80 py-3 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-200"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={() => navigate(`/friends/${friend?.id}`)}
//             className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 rounded-xl shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 active:scale-95 transition-all duration-200"
//           >
//             View All with Friend
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailPage;


import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../store/Superbase";
import { useFriends } from "../../hooks/useFriends";
import { CATEGORIES } from "../../constants/Colors";

const fetchTransactionById = async (id) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const useTransaction = (id) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
    enabled: !!id,
  });

const settleTransaction = async (id) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({ is_settled: true, settled_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: transaction,
    isLoading: txnLoading,
    isError: txnError,
  } = useTransaction(id);

  const { data: friends = [], isLoading: friendsLoading } = useFriends();

  const settleMutation = useMutation({
    mutationFn: () => settleTransaction(id),
    onSuccess: (updated) => {
      queryClient.setQueryData(["transaction", id], updated);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  console.log("transaction:", transaction);

  const isLoading = txnLoading || friendsLoading;

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (txnError || !transaction) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-500">No transaction data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200/60"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    amount,
    transaction_type,
    category,
    description,
    created_at,
    user_id,
    is_settled,
  } = transaction;

  const friend = friends.find((f) => String(f.id) === String(user_id));

  const categoryData = CATEGORIES.find((c) => c.name === category) || {
    icon: "📦",
    name: "Other",
  };

  const isGave = transaction_type === "gave";
  const formattedAmount = isGave ? `-₹${amount}` : `+₹${amount}`;
  const directionText = isGave ? "You gave" : "You received";
  const directionColor = isGave ? "text-orange-600" : "text-emerald-600";
  const bgColor = isGave ? "bg-orange-50" : "bg-emerald-50";
  const borderColor = isGave ? "border-orange-200" : "border-emerald-200";

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/40 px-5 pt-5 pb-4 flex-shrink-0 shadow-sm shadow-indigo-100/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-indigo-50/80 backdrop-blur-sm flex items-center justify-center text-indigo-600 active:scale-90 transition-all duration-200 hover:bg-indigo-100/80 flex-shrink-0 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
              Transaction Details
            </p>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-8 space-y-6 relative">
        {/* Main Amount Card */}
        <div
          className={`relative overflow-hidden rounded-2xl p-6 ${bgColor} border ${borderColor} shadow-sm flex flex-col items-center justify-center gap-2 transition-all`}
        >
          <span className="text-sm font-medium text-gray-500">{directionText}</span>
          <span className={`text-4xl font-bold ${directionColor}`}>
            {formattedAmount}
          </span>
          {description && (
            <span className="text-sm text-gray-600 mt-1">{description}</span>
          )}
          {is_settled && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mt-1">
              ✓ Settled
            </span>
          )}
          {/* Decorative icon */}
          <div className="absolute -top-8 -right-8 text-8xl opacity-10 select-none pointer-events-none">
            {isGave ? "↑" : "↓"}
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-sm divide-y divide-gray-100/80 overflow-hidden">
          {/* ... unchanged rows (Category, Friend, Date & Time, Transaction ID) ... */}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 text-sm font-semibold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200/80 py-3 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-200"
          >
            Go Back
          </button>
          {!is_settled && (
            <button
              onClick={() => settleMutation.mutate()}
              disabled={settleMutation.isPending}
              className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 rounded-xl shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/80 active:scale-95 transition-all duration-200 disabled:opacity-60"
            >
              {settleMutation.isPending ? "Settling..." : "Mark as Settled"}
            </button>
          )}
          <button
            onClick={() => navigate(`/friends/${friend?.id}`)}
            className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 rounded-xl shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 active:scale-95 transition-all duration-200"
          >
            View All with Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;