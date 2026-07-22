import { useQuery } from '@tanstack/react-query';
import { fetchFriends, fetchTransactions } from '../api/Friends';

export const useFriends = () => {
  const query = useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
  });

  console.log('[useFriends] status:', query.status, {
    isLoading: query.isLoading,
    isFetching: query.isFetching, // true even on background refetch
    data: query.data,
    error: query.error,
  });

  return query;
};




export const useTransactions = (friendId) =>
  useQuery({
    queryKey: ["transactions", friendId],
    queryFn: () => fetchTransactions(friendId),
    enabled: !!friendId, // don't fire until we actually have an id
  });

