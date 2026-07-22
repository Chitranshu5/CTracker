import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./navigation/Layout";
import HomePage from "./module/HomeScreen/HomePage";
import FriendsPage from "./module/FriendScreen/FriendsPage";
import ProfilePage from "./module/Profile/ProfilePage";
import FriendDetailPage from "./module/FriendScreen/FriendDetailPage";
import AddTransactionPage from "./module/FriendScreen/AddTransactionPage";
import AddFriendPage from "./module/HomeScreen/AddFriendPage";
import TransactionDetailPage from "./module/Profile/TransactionDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="friends/:id" element={<FriendDetailPage />} />
          <Route
            path="friends/:id/add-transaction"
            element={<AddTransactionPage />}
          />
          <Route path="add-friend" element={<AddFriendPage />} />

          <Route path="/transaction/:id" element={<TransactionDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
