import React, { useState } from "react";
import TransactionForm from "./module/TransactionForm";
import TransactionList from "./module/TransactionList";

// ── Page components ──────────────────────────────────────
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
      <span className="text-5xl">🏠</span>
      <p className="text-xl font-medium text-gray-800">Home</p>
      <p className="text-sm">Your dashboard overview</p>
    </div>
  );
}

function TransactionsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
      <span className="text-5xl">💸</span>
      <p className="text-xl font-medium text-gray-800">Transactions</p>
      <p className="text-sm">Give & receive money</p>
    </div>
  );
}

function UserListPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
      <span className="text-5xl">👥</span>
      <p className="text-xl font-medium text-gray-800">User List</p>
      <p className="text-sm">Manage your friends</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
      <span className="text-5xl">⚙️</span>
      <p className="text-xl font-medium text-gray-800">Settings</p>
      <p className="text-sm">App preferences</p>
    </div>
  );
}

// ── Tab config ────────────────────────────────────────────
const tabs = [
  { id: "home",         label: "Home",         icon: "🏠",  page: HomePage },
  { id: "transactions", label: "Transactions", icon: "💸",  page: TransactionList },
  { id: "users",        label: "Users",        icon: "👥",  page: TransactionForm },
  { id: "settings",     label: "Settings",     icon: "⚙️", page: SettingsPage },
];

// ── App ───────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState("home");

  const ActivePage = tabs.find((t) => t.id === activeTab)?.page;

  return (
    <div className="flex flex-col h-screen bg-white max-w-sm mx-auto">

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {ActivePage && <ActivePage />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto
               flex bg-white border-t border-gray-100 z-50">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium
              transition-colors duration-150
              ${activeTab === id ? "text-violet-600" : "text-gray-400 hover:text-gray-600"}`}
          >
            <span className="text-xl leading-none">{icon}</span>
            <span>{label}</span>
            {activeTab === id && (
              <span className="w-1 h-1 rounded-full bg-violet-600" />
            )}
          </button>
        ))}
      </nav>

    </div>
  );
}

export default App;