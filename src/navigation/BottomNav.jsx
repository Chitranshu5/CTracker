import { useState } from "react";
import { Home, ArrowLeftRight, Users, Settings } from "lucide-react";

const tabs = [
  { id: "home",         label: "Home",         icon: Home },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "users",        label: "Users",        icon: Users },
  { id: "settings",     label: "Settings",     icon: Settings },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50
      flex bg-white border-t border-gray-100
      pb-safe">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 flex flex-col items-center
            gap-1 py-2 text-xs font-medium
            transition-colors duration-150
            ${active === id
              ? "text-violet-600"
              : "text-gray-400 hover:text-gray-600"
            }`}
        >
          <Icon size={22} strokeWidth={1.75} />
          <span>{label}</span>
          {active === id && (
            <span className="w-1 h-1 rounded-full bg-violet-600" />
          )}
        </button>
      ))}
    </nav>
  );
}