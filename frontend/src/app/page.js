"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";
import { getAllUsers } from "@/service/getAllUser";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center py-10 gap-8">
      <UserForm onUserSaved={fetchUsers} />

      <section className="w-full max-w-2xl px-4">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Registered Users</h3>
          <button
            className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="bg-white shadow rounded">
          {users.length === 0 && !loading ? (
            <p className="p-4 text-gray-500">No users found.</p>
          ) : (
            <ul className="divide-y">
              {users.map((user) => (
                <li key={user._id} className="p-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          )}

          {loading && <p className="p-4 text-gray-500">Loading users...</p>}
        </div>
      </section>
    </main>
  );
}
