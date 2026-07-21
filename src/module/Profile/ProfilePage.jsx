// ProfilePage.jsx
import React, { useState } from 'react';

// Dummy user data
const user = {
  name: 'Chinu',
  initials: 'CH',
  email: 'chinu@example.com',
  avatarBg: 'from-indigo-500 to-purple-500',
  status: 'online',
  joined: 'Jan 2025',
};

// Dummy statistics
const stats = {
  totalGiven: 4200,
  totalReceived: 1800,
  netBalance: -2400, // negative means you owe
  friendsCount: 4,
  transactionsCount: 5,
};

// Settings items
const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Edit Profile', action: 'arrow' },
      { icon: '🔔', label: 'Notifications', action: 'toggle', defaultOn: true },
      { icon: '🔒', label: 'Privacy', action: 'arrow' },
      { icon: '🌙', label: 'Dark Mode', action: 'toggle', defaultOn: false },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: '💳', label: 'Payment Methods', action: 'arrow' },
      { icon: '🌐', label: 'Language', action: 'arrow', value: 'English' },
      { icon: '📅', label: 'Currency', action: 'arrow', value: '₹ INR' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help & FAQ', action: 'arrow' },
      { icon: '📧', label: 'Contact Us', action: 'arrow' },
      { icon: '📋', label: 'Terms & Privacy', action: 'arrow' },
    ],
  },
];

const ProfilePage = () => {
  // State for toggles
  const [settingsState, setSettingsState] = useState(
    settingsSections.reduce((acc, section) => {
      section.items.forEach((item) => {
        if (item.action === 'toggle') {
          acc[item.label] = item.defaultOn;
        }
      });
      return acc;
    }, {})
  );

  const toggleSwitch = (label) => {
    setSettingsState((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">

      {/* Header - same as HomePage */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-5 pt-6 pb-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-indigo-400 tracking-wide">Hello there ✨</p>
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          </div>
          <div className="relative">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${user.avatarBg} flex items-center justify-center text-white font-bold shadow-md`}>
              {user.initials}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-24">

        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/50 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.avatarBg} flex items-center justify-center text-3xl text-white font-bold shadow-lg`}>
              {user.initials}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  {user.status}
                </span>
                <span className="text-xs text-gray-400">Joined {user.joined}</span>
              </div>
            </div>
            <button className="text-xs font-medium text-indigo-500 bg-indigo-50 px-4 py-2 rounded-full active:scale-95 transition">
              Edit
            </button>
          </div>
        </div>

        {/* Stats Summary - similar to HomePage summary cards but for profile */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-500">Given</p>
              <span className="text-orange-400 text-lg">↑</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">₹{stats.totalGiven.toLocaleString()}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-white/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-500">Received</p>
              <span className="text-emerald-400 text-lg">↓</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">₹{stats.totalReceived.toLocaleString()}</p>
          </div>
          <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-indigo-100">Net balance</p>
                <p className="text-2xl font-bold text-white">₹{Math.abs(stats.netBalance).toLocaleString()}</p>
                <p className="text-xs text-indigo-100 mt-0.5">{stats.netBalance >= 0 ? 'You are owed' : 'You owe'}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">💳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats: friends & transactions */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-white/50 text-center">
            <p className="text-2xl font-bold text-indigo-600">{stats.friendsCount}</p>
            <p className="text-xs text-gray-500">Friends</p>
          </div>
          <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-white/50 text-center">
            <p className="text-2xl font-bold text-indigo-600">{stats.transactionsCount}</p>
            <p className="text-xs text-gray-500">Transactions</p>
          </div>
        </div>

        {/* Settings List */}
        {settingsSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`flex items-center justify-between px-4 py-3 ${
                    itemIdx !== section.items.length - 1 ? 'border-b border-gray-100/50' : ''
                  } active:bg-gray-50/50 transition`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.action === 'arrow' && (
                      <>
                        {item.value && <span className="text-xs text-gray-400">{item.value}</span>}
                        <span className="text-gray-300 text-lg">›</span>
                      </>
                    )}
                    {item.action === 'toggle' && (
                      <button
                        onClick={() => toggleSwitch(item.label)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          settingsState[item.label] ? 'bg-indigo-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            settingsState[item.label] ? 'translate-x-4' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-red-200 text-red-500 font-semibold text-sm active:bg-red-50 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;