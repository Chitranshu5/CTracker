import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddFriend } from "../../hooks/useAddTransaction";

const AddFriendPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    mutate: saveFriend,
    isPending: saving,
    error: saveError,
  } = useAddFriend();

  const handleSave = () => {
    if (!name.trim()) {
      alert("Username is required");
      return;
    }

    setSuccessMessage("");

    saveFriend(
      { name, email, phone },
      {
        onSuccess: () => {
          setSuccessMessage("✅ User Added Successfully!");
          setName("");
          setEmail("");
          setPhone("");

          setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
          }, 1500);
        },
        onError: (err) => {
          alert(err.message);
        },
      },
    );
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/40 px-5 pt-5 pb-4 flex-shrink-0 shadow-sm shadow-indigo-100/30">
        <div className="flex items-center gap-3">
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

          <div>
            <p className="text-[10px] font-semibold text-indigo-400 tracking-[0.2em] uppercase">
              New contact
            </p>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              Add Friend
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-8 space-y-5 relative">
        {/* Avatar Preview */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200/50 ring-4 ring-white/80 transition-all duration-300 ${
                name.trim()
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                  : "bg-gradient-to-br from-gray-300 to-gray-400"
              }`}
            >
              {name.trim() ? name.trim().slice(0, 2).toUpperCase() : "?"}
            </div>
            {/* Visual edit hint (non-functional, just UI sugar) */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Profile picture (optional)
          </span>
        </div>

        {/* Name Input */}
        <div>
          <label className="text-xs font-semibold text-gray-500 ml-1 flex items-center gap-1">
            <span className="text-red-400">*</span> Name
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter friend's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <label className="text-xs font-semibold text-gray-500 ml-1">
            Phone
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
            </div>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="text-xs font-semibold text-gray-500 ml-1">
            Email
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
            </div>
            <input
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 rounded-2xl p-4 flex items-center gap-3 shadow-sm shadow-emerald-100/50 animate-fade-in-up">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name || saving}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-4 shadow-sm ${
            name && !saving
              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-indigo-200/60 hover:shadow-indigo-300/80 hover:scale-[1.02] active:scale-95"
              : "bg-gray-100/80 backdrop-blur-sm text-gray-400 cursor-not-allowed border border-gray-200/50"
          }`}
        >
          {saving ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Friend"
          )}
        </button>
      </div>

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

export default AddFriendPage;
