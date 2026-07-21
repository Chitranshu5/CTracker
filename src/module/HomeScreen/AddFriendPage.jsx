// AddFriendPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../store/Superbase";

const AddFriendPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Username is required");
      return;
    }

    setSuccessMessage("");

    const { data, error } = await supabase
      .from("User")
      .insert([
        {
          username: name,
          email: email,
          phone_number: phone,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    console.log("Saved User:", data);

    setSuccessMessage("✅ User Added Successfully!");

    setName("");
    setEmail("");
    setPhone("");

    setTimeout(() => {
      setSuccessMessage("");
      navigate("/");
    }, 1500);
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
            <p className="text-xs font-semibold text-indigo-400 tracking-wide">
              New contact
            </p>
            <h1 className="text-lg font-bold text-gray-800">
              Add Friend
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-8 space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {name.trim() ? name.trim().slice(0, 2).toUpperCase() : "?"}
          </div>

          <span className="text-xs text-gray-400">
            Profile picture (optional, add later)
          </span>
        </div>

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Name
          </label>

          <input
            type="text"
            placeholder="Friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Phone
          </label>

          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Email
          </label>

          <input
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl p-3 text-sm">
            {successMessage}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition active:scale-95 ${
            name
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Save Friend
        </button>
      </div>
    </div>
  );
};

export default AddFriendPage;