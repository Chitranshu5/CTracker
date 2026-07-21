// // components/AddFriendSheet.jsx
// import React, { useState } from 'react'

// const COLORS = [
//   { bg: '#EEEDFE', text: '#534AB7' },
//   { bg: '#E1F5EE', text: '#0F6E56' },
//   { bg: '#FAECE7', text: '#993C1D' },
//   { bg: '#FBEAF0', text: '#993556' },
//   { bg: '#FEF9E7', text: '#9A7D0A' },
//   { bg: '#EAF4FE', text: '#1A6FA8' },
// ]

// const getInitials = (name) =>
//   name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

// const AddFriendSheet = ({ isOpen, onClose, onAdd }) => {
//   const [name, setName] = useState('')
//   const [phone, setPhone] = useState('')
//   const [selectedColor, setSelectedColor] = useState(0)

//   const initials = name ? getInitials(name) : '?'

//   const handleSubmit = () => {
//     if (!name.trim()) return
//     onAdd({
//       id: Date.now().toString(),
//       name: name.trim(),
//       phone: phone.trim(),
//       initials,
//       bgColor: COLORS[selectedColor].bg,
//       textColor: COLORS[selectedColor].text,
//       balance: '₹0',
//       direction: 'none',
//     })
//     setName('')
//     setPhone('')
//     setSelectedColor(0)
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//         onClick={onClose}
//       />

//       {/* Bottom Sheet */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl px-5 pt-4 pb-10 animate-slide-up">
        
//         {/* Drag handle */}
//         <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

//         {/* Title */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-bold text-gray-800">Add Friend</h2>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm active:scale-95 transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Avatar Preview */}
//         <div className="flex justify-center mb-6">
//           <div
//             className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-md ring-4 ring-white transition-all"
//             style={{ backgroundColor: COLORS[selectedColor].bg, color: COLORS[selectedColor].text }}
//           >
//             {initials}
//           </div>
//         </div>

//         {/* Color Picker */}
//         <div className="flex justify-center gap-3 mb-6">
//           {COLORS.map((c, i) => (
//             <button
//               key={i}
//               onClick={() => setSelectedColor(i)}
//               className={`w-8 h-8 rounded-full transition-transform active:scale-95 ${selectedColor === i ? 'ring-2 ring-offset-2 ring-indigo-400 scale-110' : ''}`}
//               style={{ backgroundColor: c.bg, border: `2px solid ${c.text}33` }}
//             />
//           ))}
//         </div>

//         {/* Name Input */}
//         <div className="mb-4">
//           <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Name *</label>
//           <input
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             placeholder="e.g. Arjun Kumar"
//             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//           />
//         </div>

//         {/* Phone Input */}
//         <div className="mb-7">
//           <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Phone (optional)</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={e => setPhone(e.target.value)}
//             placeholder="e.g. 9876543210"
//             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={!name.trim()}
//           className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           Add Friend
//         </button>
//       </div>
//     </>
//   )
// }

// export default AddFriendSheet

// components/AddFriendSheet.jsx
import React, { useState } from 'react'
import { supabase } from '../store/Superbase'

const COLORS = [
  { bg: '#EEEDFE', text: '#534AB7' },
  { bg: '#E1F5EE', text: '#0F6E56' },
  { bg: '#FAECE7', text: '#993C1D' },
  { bg: '#FBEAF0', text: '#993556' },
  { bg: '#FEF9E7', text: '#9A7D0A' },
  { bg: '#EAF4FE', text: '#1A6FA8' },
]

const getInitials = (name) =>
  name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const AddFriendSheet = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedColor, setSelectedColor] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const initials = name ? getInitials(name) : '?'

  const handleSubmit = async () => {
    if (!name.trim()) {
      console.log('Submit blocked — name is empty')
      return
    }

    setSaving(true)
    setError(null)

    // id is NOT included — int8 identity column, Postgres auto-generates it
    const payload = {
      username: name.trim(),
      email: email.trim() || null,
      phone_number: phone.trim() || null,
    }

    console.log('Inserting into users table with payload:', payload)

    const { data, error } = await supabase
      .from('users')
      .insert(payload)
      .select()

    setSaving(false)

    if (error) {
      console.log('Error inserting user:', error)
      setError('Something went wrong adding this friend. Try again.')
      return
    }

    console.log('User inserted successfully:', data)
    console.log('Auto-generated user id (int8):', data[0].id)

    // Merge in local-only UI fields (initials/color) since the table doesn't store them
    onAdd({
      ...data[0],
      initials,
      bgColor: COLORS[selectedColor].bg,
      textColor: COLORS[selectedColor].text,
      balance: '₹0',
      direction: 'none',
    })

    setName('')
    setPhone('')
    setEmail('')
    setSelectedColor(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl px-5 pt-4 pb-10 animate-slide-up">

        {/* Drag handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Add Friend</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm active:scale-95 transition"
          >
            ✕
          </button>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-md ring-4 ring-white transition-all"
            style={{ backgroundColor: COLORS[selectedColor].bg, color: COLORS[selectedColor].text }}
          >
            {initials}
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex justify-center gap-3 mb-6">
          {COLORS.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedColor(i)}
              className={`w-8 h-8 rounded-full transition-transform active:scale-95 ${selectedColor === i ? 'ring-2 ring-offset-2 ring-indigo-400 scale-110' : ''}`}
              style={{ backgroundColor: c.bg, border: `2px solid ${c.text}33` }}
            />
          ))}
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Arjun Kumar"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Phone (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="e.g. 9876543210"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {/* Email Input */}
        <div className="mb-7">
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="e.g. arjun@example.com"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || saving}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Adding...' : 'Add Friend'}
        </button>
      </div>
    </>
  )
}

export default AddFriendSheet