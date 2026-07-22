
import React from "react";
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

  const balance = transactions.reduce((total, tx) => {
    if (tx.transaction_type === "gave") return total + Number(tx.amount);
    if (tx.transaction_type === "received") return total - Number(tx.amount);
    return total;
  }, 0);

  const direction = balance >= 0 ? "owes" : "owed";

  if (friendsLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500 text-sm">Friend not found.</p>
        <button
          onClick={() => navigate("/friends")}
          className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg"
        >
          Back to friends
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Header */}
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
            style={{ backgroundColor: friend.bgColor, color: friend.textColor }}
          >
            {friend.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800">{friend.name}</h1>
            <p className="text-xs text-gray-500 truncate">{friend.email}</p>
            <p className="text-xs text-gray-500">{friend.phone}</p>
          </div>
        </div>

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
            className={`text-lg font-bold ${direction === "owes" ? "text-orange-600" : "text-emerald-600"}`}
          >
            {formatBalance(balance)}
          </span>
        </div>

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

      {/* Transaction history */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Transaction history
        </h2>

        <div className="space-y-3">
          {txnsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-3 block">🧾</span>
              <p className="text-gray-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            transactions.map((tx) => {
              const categoryData = CATEGORIES.find(
                (c) => c.name === tx.category,
              ) || { icon: "📦", name: "Other" };

              return (
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

                    <p className="text-xs text-gray-500">
                      {categoryData.icon} {tx.category}
                    </p>

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
              );
            })
          )}
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default FriendDetailPage;
