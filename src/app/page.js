"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

export default function Page() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get("https://randomuser.me/api/");
    setUser(res.data.results[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p className="text-white text-center mt-10">Loading...</p>;

  return <UserCard user={user} onRefresh={fetchUser} />;
}
