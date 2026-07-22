import { COLORS1 } from "../constants/Colors";
import { supabase } from "../store/Superbase";

export const fetchFriends = async () => {
  console.log('[api/friends] fetchFriends called — hitting Supabase');

  const { data, error } = await supabase
    .from('User')
    .select('id, username, email, phone_number')
    .order('id', { ascending: true });

  if (error) {
    console.error('[api/friends] Supabase error:', error);
    throw error;
  }

  console.log('[api/friends] raw data from Supabase:', data);

  const formatted = data.map((user, index) => {
    const color = COLORS1[index % COLORS1.length];
    return {
      id: user.id,
      name: user.username,
      email: user.email,
      phone: user.phone_number,
      initials: user.username
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      bgColor: color.bgColor,
      textColor: color.textColor,
      balance: 0,
      direction: 'owed',
    };
  });

  console.log('[api/friends] formatted friends:', formatted);
  return formatted;
};


export const fetchTransactions = async (userId) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  console.log('[api/transactions] raw data from Supabase:', data); // ← move above return
  return data;
};

export const fetchAllTransactions = async () => {
  const { data, error } = await supabase
    .from("transactions")
    .select("user_id, transaction_type, amount");

  if (error) throw error;
  return data;
};