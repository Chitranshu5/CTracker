

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFriendsWithBalances } from "../../hooks/useFriendsWithBalances";

const FriendsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
const { data: friends = [], isLoading, error } = useFriendsWithBalances();

  console.log("[FriendsPage] render — got", friends.length, "friends from cache, isLoading:", isLoading);

  const filteredFriends = useMemo(() => {
    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [friends, searchQuery]);

  const formatBalance = (balance) => {
    const absBalance = Math.abs(balance);
    return balance >= 0 ? `+₹${absBalance}` : `-₹${absBalance}`;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-indigo-400 tracking-wide">Friends</p>
            <h1 className="text-xl font-bold text-gray-800">Your network</h1>
          </div>
          <button
            onClick={() => navigate("/add-friend")}
            className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 active:scale-95 transition"
          >
            <span className="text-xl">➕</span>
          </button>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading friends...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 text-sm">{error.message}</div>
        ) : (
          <div className="space-y-3">
            {filteredFriends.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl mb-3 block">👥</span>
                <p className="text-gray-500 text-sm">No friends found</p>
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => navigate(`/friends/${friend.id}`, { state: { friend } })}
                  className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shadow-md ring-2 ring-white flex-shrink-0"
                    style={{ backgroundColor: friend.bgColor, color: friend.textColor }}
                  >
                    {friend.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{friend.name}</h3>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          friend.direction === "owes"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {formatBalance(friend.balance)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{friend.phone || "No phone number"}</p>
                    <div className="flex gap-2 mt-1">
                      <button onClick={(e) => e.stopPropagation()} className="text-[10px] font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                        Message
                      </button>
                      <button onClick={(e) => e.stopPropagation()} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Settle up
                      </button>
                    </div>
                  </div>

                  <button onClick={(e) => e.stopPropagation()} className="text-gray-400 p-1">
                    <span className="text-lg">⋮</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default FriendsPage;