"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Lock,
  RefreshCw,
} from "lucide-react";

export default function UserCard({ user, onRefresh }) {
  const [active, setActive] = useState("name");

  const infoMap = {
    name: {
      label: "My name is",
      value: `${user.name.first} ${user.name.last}`,
      icon: <User size={28} />,
    },
    email: {
      label: "My email is",
      value: user.email,
      icon: <Mail size={28} />,
    },
    dob: {
      label: "My birthday is",
      value: new Date(user.dob.date).toLocaleDateString(),
      icon: <Calendar size={28} />,
    },
    location: {
      label: "My address is",
      value: `${user.location.city}, ${user.location.country}`,
      icon: <MapPin size={28} />,
    },
    phone: {
      label: "My phone is",
      value: user.phone,
      icon: <Phone size={28} />,
    },
    password: {
      label: "My password is",
      value: user.login.password,
      icon: <Lock size={28} />,
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/image/bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        layout
        className="relative z-10 bg-white/10 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 text-center w-[650px] max-w-[90vw]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <motion.img
            key={user.picture.large}
            src={user.picture.large}
            alt="User"
            className="w-40 h-40 rounded-full border-4 border-white/50 shadow-lg object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <p className="text-sm text-gray-200 mb-2 tracking-wide">
              {infoMap[active].label}
            </p>
            <p className="text-2xl md:text-3xl font-serif font-semibold break-words px-4">
              {infoMap[active].value}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-7 mt-6 flex-wrap">
          {Object.keys(infoMap).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`transition transform hover:scale-110 ${
                active === key ? "text-emerald-400" : "text-white/60"
              }`}
            >
              {infoMap[key].icon}
            </button>
          ))}
        </div>

        <button
          onClick={onRefresh}
          className="mt-10 px-6 py-2.5 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition flex items-center gap-2 mx-auto font-medium tracking-wide"
        >
          <RefreshCw size={18} /> Next Profile
        </button>
      </motion.div>
    </div>
  );
}
