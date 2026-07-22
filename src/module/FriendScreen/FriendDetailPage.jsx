import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFriends, useTransactions } from "../../hooks/useFriends";
import { CATEGORIES } from "../../constants/Colors";

const FriendDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: friends = [], isLoading: friendsLoading } = useFriends();
  const friend = friends.find((f) => String(f.id) === id);

  const { data: transactions = [], isLoading: txnsLoading } =
    useTransactions(id);

  const formatBalance = (balance) => {
    const absBalance = Math.abs(balance);
    return balance > 0 ? `+₹${absBalance}` : `-₹${absBalance}`;
  };

const balance = useMemo(() => transactions.reduce((total, tx) => {
  if (tx.is_settled) return total;
  if (tx.transaction_type === "gave") return total + Number(tx.amount);
  if (tx.transaction_type === "received") return total - Number(tx.amount);
  return total;
}, 0), [transactions]);


  const direction = balance >= 0 ? "owes" : "owed";

  if (friendsLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-4xl">
          👤
        </div>
        <p className="text-gray-400 text-sm font-medium">Friend not found.</p>
        <button
          onClick={() => navigate("/friends")}
          className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 active:scale-95 transition-all duration-200"
        >
          Back to friends
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 flex flex-col overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/40 px-5 pt-5 pb-4 flex-shrink-0 shadow-sm shadow-indigo-100/30">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-indigo-50/80 backdrop-blur-sm flex items-center justify-center text-indigo-600 active:scale-90 transition-all duration-200 hover:bg-indigo-100/80 flex-shrink-0 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
            Profile
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-200/40 ring-2 ring-white/80 flex-shrink-0 transition-transform hover:scale-105 duration-300"
            style={{ backgroundColor: friend.bgColor, color: friend.textColor }}
          >
            {friend.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              {friend.name}
            </h1>
            <p className="text-xs text-gray-400 truncate flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {friend.email}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {friend.phone}
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div
          className={`mt-4 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm transition-all duration-300 ${
            direction === "owes"
              ? "bg-orange-50/80 border border-orange-200/50 shadow-sm shadow-orange-100/50"
              : "bg-emerald-50/80 border border-emerald-200/50 shadow-sm shadow-emerald-100/50"
          }`}
        >
          <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${direction === "owes" ? "bg-orange-400" : "bg-emerald-400"}`}
            ></span>
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

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-3.5">
          <button
            onClick={() =>
              navigate(`/friends/${friend.id}/add-transaction?type=gave`)
            }
            className="flex-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 py-2.5 rounded-xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/70 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            You Gave
          </button>
          <button
            onClick={() =>
              navigate(`/friends/${friend.id}/add-transaction?type=received`)
            }
            className="flex-1 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 py-2.5 rounded-xl shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/70 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            You Got
          </button>
        </div>
      </div>

      {/* Transaction history */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="text-base">📋</span>
            Transaction history
            <span className="text-xs font-normal text-gray-400 ml-1">
              ({transactions.length})
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {txnsLoading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-400 text-sm font-medium">
                Loading transactions...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100/60">
              <span className="text-6xl mb-4 block">🧾</span>
              <p className="text-gray-400 text-sm font-medium">
                No transactions yet
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Start tracking your expenses with friends
              </p>
            </div>
          ) : (
            transactions.map((tx, index) => {
  const categoryData = CATEGORIES.find(
    (c) => c.name === tx.category,
  ) || { icon: "📦", name: "Other" };

  const isSettled = !!tx.is_settled;

  return (
    <div
      key={tx.id}
      onClick={() =>
        navigate(`/transaction/${tx.id}`, {
          state: {
            transaction: tx,
            friendName: friend.name,
            friendId: friend.id,
          },
        })
      }
      className={`group relative overflow-hidden rounded-2xl p-3.5 border shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-3.5 animate-fade-in-up ${
        isSettled
          ? "bg-emerald-50/60 backdrop-blur-md border-emerald-200/60 hover:border-emerald-300/60"
          : "bg-white/80 backdrop-blur-sm border-gray-100/60 hover:border-indigo-200/40"
      }`}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-transform group-hover:scale-105 duration-200 ${
          tx.transaction_type === "gave"
            ? "bg-orange-100/80 text-orange-600"
            : "bg-emerald-100/80 text-emerald-600"
        }`}
      >
        {tx.transaction_type === "gave" ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {tx.description || "No description"}
          </p>
          {isSettled && (
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span>{categoryData.icon}</span>
            <span>{tx.category}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          {isSettled ? (
            <span className="text-xs text-emerald-600 font-medium">
              Settled{" "}
              {new Date(tx.settled_at).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              {new Date(tx.created_at).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          )}
        </div>
      </div>

      <span
        className={`text-sm font-bold ${
          tx.transaction_type === "gave"
            ? "text-orange-600"
            : "text-emerald-600"
        }`}
      >
        {tx.transaction_type === "gave" ? "−" : "+"}₹{tx.amount}
      </span>
    </div>
  );
})
          )}
        </div>
      </div>

      <div className="h-16"></div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FriendDetailPage;
