// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "../../store/Superbase";
// import { useFriends } from "../../hooks/useFriends";
// import { CATEGORIES } from "../../constants/Colors";

// const fetchTransactionById = async (id) => {
//   const { data, error } = await supabase
//     .from("transactions")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data;
// };

// // Only hits Supabase when there's no state (e.g. direct link / hard refresh)
// const useTransaction = (id, initialData) =>
//   useQuery({
//     queryKey: ["transaction", id],
//     queryFn: () => fetchTransactionById(id),
//     enabled: !!id && !initialData,
//     initialData,
//   });

// const settleTransaction = async (id) => {
//   const { data, error } = await supabase
//     .from("transactions")
//     .update({ is_settled: true, settled_at: new Date().toISOString() })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// const TransactionDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryClient = useQueryClient();

//   const passedTransaction = location.state?.transaction;
//   const passedFriend = location.state?.friend;

//   const {
//     data: transaction,
//     isLoading: txnLoading,
//     isError: txnError,
//   } = useTransaction(id, passedTransaction);

//   // Skip the friends list fetch entirely if the friend was passed in
//   const { data: friends = [], isLoading: friendsLoading } = useFriends({
//     enabled: !passedFriend,
//   });

//   const settleMutation = useMutation({
//     mutationFn: () => settleTransaction(id),
//     onSuccess: (updated) => {
//       queryClient.setQueryData(["transaction", id], updated);
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });
//     },
//   });

//   const isLoading = (txnLoading && !passedTransaction) || (friendsLoading && !passedFriend);

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
//     is_settled,
//   } = transaction;

//   const friend = passedFriend ?? friends.find((f) => String(f.id) === String(user_id));

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
//           {is_settled && (
//             <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mt-1">
//               ✓ Settled
//             </span>
//           )}
//           {/* Decorative icon */}
//           <div className="absolute -top-8 -right-8 text-8xl opacity-10 select-none pointer-events-none">
//             {isGave ? "↑" : "↓"}
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-sm divide-y divide-gray-100/80 overflow-hidden">
//           {/* ... unchanged rows (Category, Friend, Date & Time, Transaction ID) ... */}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex-1 text-sm font-semibold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200/80 py-3 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-200"
//           >
//             Go Back
//           </button>
//           {!is_settled && (
//             <button
//               onClick={() => settleMutation.mutate()}
//               disabled={settleMutation.isPending}
//               className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 rounded-xl shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/80 active:scale-95 transition-all duration-200 disabled:opacity-60"
//             >
//               {settleMutation.isPending ? "Settling..." : "Mark as Settled"}
//             </button>
//           )}
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
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../store/Superbase";
import { CATEGORIES } from "../../constants/Colors";

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

const fetchRepayments = async (transactionId) => {
  const { data, error } = await supabase
    .from("repayments")
    .select("*")
    .eq("transaction_id", transactionId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const addRepayment = async ({ transactionId, amount, note }) => {
  const { data, error } = await supabase
    .from("repayments")
    .insert({ transaction_id: transactionId, amount, note: note || null })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const friend = location.state?.friend;
  const [transaction, setTransaction] = useState(location.state?.transaction);

  const [repayAmount, setRepayAmount] = useState("");
  const [repayNote, setRepayNote] = useState("");
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);

  const { data: repayments = [] } = useQuery({
    queryKey: ["repayments", id],
    queryFn: () => fetchRepayments(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const settleMutation = useMutation({
    mutationFn: () => settleTransaction(id),
    onSuccess: (updated) => {
      setTransaction(updated);
      queryClient.setQueryData(["transaction", id], updated);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const repaymentMutation = useMutation({
    mutationFn: addRepayment,
    onSuccess: (newRepayment) => {
      queryClient.setQueryData(["repayments", id], (old = []) => [
        newRepayment,
        ...old,
      ]);
      setRepayAmount("");
      setRepayNote("");
      setIsRepayModalOpen(false);
    },
  });

  const handleAddRepayment = () => {
    const parsed = parseFloat(repayAmount);
    if (!parsed || parsed <= 0) return;
    repaymentMutation.mutate({ transactionId: id, amount: parsed, note: repayNote });
  };

  if (!transaction) {
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

  const categoryData = CATEGORIES.find((c) => c.name === category) || {
    icon: "📦",
    name: "Other",
  };

  const totalRepaid = repayments.reduce((sum, r) => sum + Number(r.amount), 0);
  const remainingBalance = Number(amount) - totalRepaid;

  const isGave = transaction_type === "gave";
  const formattedAmount = isGave ? `-₹${amount}` : `+₹${amount}`;
  const directionText = isGave ? "You gave" : "You received";
  const directionColor = isGave ? "text-orange-600" : "text-emerald-600";
  const bgColor = isGave ? "bg-orange-50" : "bg-emerald-50";
  const borderColor = isGave ? "border-orange-200" : "border-emerald-200";

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
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
          className={`relative overflow-hidden rounded-3xl p-7 ${bgColor} border ${borderColor} shadow-sm flex flex-col items-center justify-center gap-2 transition-all`}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 tracking-wide uppercase">
            <span className="text-base leading-none">{categoryData.icon}</span>
            {directionText}
          </span>
          <span className={`text-5xl font-black tracking-tight ${directionColor}`}>
            {formattedAmount}
          </span>
          {description && (
            <span className="text-sm text-gray-600 mt-1 text-center max-w-xs">{description}</span>
          )}
          {is_settled ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mt-1 tracking-wide uppercase">
              ✓ Settled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full mt-1 tracking-wide uppercase">
              ● Pending
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

        {/* Repayments Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-sm p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
                Payment Progress
              </p>
              <h2 className="text-base font-bold text-gray-800">Repayments</h2>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
              {repayments.length} {repayments.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(0, (totalRepaid / Number(amount || 1)) * 100))}%`,
                }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-400">
              {Number(amount) > 0
                ? Math.min(100, Math.round((totalRepaid / Number(amount)) * 100))
                : 0}
              % repaid
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50/80 rounded-xl py-3 px-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Total</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">₹{amount}</p>
            </div>
            <div className="bg-emerald-50/80 rounded-xl py-3 px-1">
              <p className="text-[10px] text-emerald-500 uppercase tracking-wide font-medium">Repaid</p>
              <p className="text-sm font-bold text-emerald-600 mt-0.5">₹{totalRepaid}</p>
            </div>
            <div className="bg-orange-50/80 rounded-xl py-3 px-1">
              <p className="text-[10px] text-orange-500 uppercase tracking-wide font-medium">Remaining</p>
              <p className="text-sm font-bold text-orange-600 mt-0.5">₹{remainingBalance}</p>
            </div>
          </div>

          <button
            onClick={() => setIsRepayModalOpen(true)}
            disabled={remainingBalance <= 0}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 py-3 rounded-xl hover:bg-indigo-100 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:active:scale-100"
          >
            <span className="text-base leading-none">+</span> Partial Settle
          </button>

          {repayments.length > 0 ? (
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-1">
                History
              </p>
              <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#e5e7eb_transparent]">
                {repayments.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                        ₹
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-700 text-sm">₹{r.amount}</p>
                        {r.note && (
                          <p className="text-xs text-gray-400 truncate">{r.note}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 flex-shrink-0 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-3">
              No repayments recorded yet
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 text-sm font-semibold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200/80 py-3.5 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-200"
          >
            Go Back
          </button>
          {!is_settled && (
            <button
              onClick={() => settleMutation.mutate()}
              disabled={settleMutation.isPending}
              className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 py-3.5 rounded-xl shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/80 active:scale-95 transition-all duration-200 disabled:opacity-60"
            >
              {settleMutation.isPending ? "Settling..." : "Mark as Settled"}
            </button>
          )}
          <button
            onClick={() => navigate(`/friends/${friend?.id}`)}
            className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 rounded-xl shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 active:scale-95 transition-all duration-200"
          >
            View All with Friend
          </button>
        </div>
      </div>

      {/* Partial Settle Modal */}
      {isRepayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsRepayModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white rounded-t-[2rem] p-6 pb-8 space-y-5 shadow-2xl animate-[slideUp_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto -mt-1"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
                  Log a payment
                </p>
                <h2 className="text-lg font-bold text-gray-800">Partial Settlement</h2>
              </div>
              <button
                onClick={() => setIsRepayModalOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 active:scale-90 transition-all duration-200 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between bg-orange-50/80 border border-orange-100 rounded-xl px-4 py-2.5">
              <span className="text-xs font-medium text-gray-500">Remaining balance</span>
              <span className="text-sm font-bold text-orange-600">₹{remainingBalance}</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={repayAmount}
                    onChange={(e) => setRepayAmount(e.target.value)}
                    placeholder="0"
                    autoFocus
                    className="w-full text-lg font-semibold text-gray-800 border border-gray-200 rounded-xl pl-8 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Note (optional)</label>
                <input
                  type="text"
                  value={repayNote}
                  onChange={(e) => setRepayNote(e.target.value)}
                  placeholder="e.g. Paid via UPI"
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleAddRepayment}
              disabled={repaymentMutation.isPending}
              className="w-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 rounded-xl shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
            >
              {repaymentMutation.isPending ? "Saving..." : "Save Repayment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailPage;