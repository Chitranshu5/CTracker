import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../store/Superbase';

const addTransaction = async (payload) => {
  const { data, error } = await supabase.from('transactions').insert(payload).select();
  if (error) throw error;
  return data;
};

export const useAddTransaction = (friendId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', friendId] });
    },
  });
};

const addFriend = async ({ name, email, phone }) => {
  const { data, error } = await supabase
    .from('User')
    .insert([{ username: name, email, phone_number: phone }])
    .select();

  if (error) throw error;
  return data;
};

export const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });
};