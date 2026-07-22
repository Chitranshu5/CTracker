import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTransactions } from "../api/Friends";
import { useFriends } from "./useFriends";

const useAllTransactions = () =>
  useQuery({
    queryKey: ["transactions", "all"],
    queryFn: fetchAllTransactions,
  });

export const useFriendsWithBalances = () => {
  const { data: friends = [], isLoading: friendsLoading, error: friendsError } = useFriends();
  const { data: transactions = [], isLoading: txnsLoading, error: txnsError } = useAllTransactions();

  const friendsWithBalances = useMemo(() => {
    return friends.map((friend) => {
      const friendTxns = transactions.filter(
        (tx) => String(tx.user_id) === String(friend.id)
      );

      const balance = friendTxns.reduce((total, tx) => {
        if (tx.transaction_type === "gave") return total + Number(tx.amount);
        if (tx.transaction_type === "received") return total - Number(tx.amount);
        return total; // "settled" doesn't move the balance
      }, 0);

      return {
        ...friend,
        balance,
        direction: balance <= 0 ? "owes" : "owed",
      };
    });
  }, [friends, transactions]);

  return {
    data: friendsWithBalances,
    isLoading: friendsLoading || txnsLoading,
    error: friendsError || txnsError,
  };
};

