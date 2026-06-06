import { useState, useEffect } from "react";
import { supabase } from "./store/Superbase";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data, error } = await supabase.from("User").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data);
  };

  const addUser = async () => {
    const { error } = await supabase.from("User").insert([
      {
        username,
        email,
        password,
      },
    ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");

    getUsers();
  };

  return (
    // <div className="min-h-screen bg-gray-950 p-8">
    //   <div className="max-w-md mx-auto">
    //     <h1 className="text-3xl font-bold text-white mb-6">Supabase Users</h1>

    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
    //     />

    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
    //     />

    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
    //     />

    //     <button
    //       onClick={addUser}
    //       className="w-full bg-violet-600 text-white py-3 rounded"
    //     >
    //       Save User
    //     </button>

    //     <div className="mt-8">
    //       {users.map((user) => (
    //         <div
    //           key={user.id}
    //           className="bg-gray-800 text-white p-4 rounded mb-3"
    //         >
    //           <p>
    //             <strong>ID:</strong> {user.id}
    //           </p>
    //           <p>
    //             <strong>Username:</strong> {user.username}
    //           </p>
    //           <p>
    //             <strong>Email:</strong> {user.email}
    //           </p>
    //           <p>
    //             <strong>Password:</strong> {user.password}
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-100 p-4">
  <div className="max-w-md mx-auto space-y-4">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold">
        Expense Tracker
      </h1>
      <p className="text-gray-500">
        Hello, Chitram 👋
      </p>
    </div>

    {/* Balance */}
    <div className="bg-blue-600 text-white p-5 rounded-2xl">
      <p>Total Balance</p>
      <h2 className="text-3xl font-bold">
        ₹24,500
      </h2>
    </div>

    {/* Summary */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white p-4 rounded-xl shadow">
        <p>Income</p>
        <h3 className="text-green-600 font-bold">
          ₹40,000
        </h3>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Expense</p>
        <h3 className="text-red-600 font-bold">
          ₹15,500
        </h3>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Lend</p>
        <h3 className="text-orange-600 font-bold">
          ₹5,000
        </h3>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Borrow</p>
        <h3 className="text-purple-600 font-bold">
          ₹2,000
        </h3>
      </div>
    </div>

    {/* Transactions */}
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-bold mb-3">
        Recent Transactions
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Salary</span>
          <span className="text-green-600">
            +₹30,000
          </span>
        </div>

        <div className="flex justify-between">
          <span>Rent</span>
          <span className="text-red-600">
            -₹8,000
          </span>
        </div>

        <div className="flex justify-between">
          <span>Friend Loan</span>
          <span className="text-orange-600">
            -₹2,000
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
