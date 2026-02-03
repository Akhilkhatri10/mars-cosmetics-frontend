import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setUsers(data);
            } catch {
                toast.error("Failed to load customers");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin" size={28} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">Customers</h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-4">
                Showing all registered customers (users and admins)
            </p>

            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0">

                {/* <table className="min-w-full text-sm border-separate border-spacing-y-2"> */}
                <table className="w-full text-sm border-separate border-spacing-y-2 table-auto lg:table-fixed">
                    <colgroup>
                        <col className="w-[28%]" /> {/* Name */}
                        <col className="w-[32%]" /> {/* Email */}
                        <col className="w-[12%]" /> {/* Role */}
                        <col className="w-[14%]" /> {/* Joined */}
                        <col className="w-[14%]" /> {/* Status */}
                    </colgroup>

                    <thead>
                        <tr className="text-left text-gray-900">
                            <th className="px-6 sm:px-4 lg:px-0">Name</th>
                            <th className="px-10 sm:px-3 lg:px-0">Email</th>
                            <th className="px-10 sm:px-4 lg:px-2">Role</th>
                            <th className="px-10 sm:px-4 lg:px-7">Joined</th>
                            <th className="px-10 sm:px-4 lg:px-7">Status</th>

                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr
                                key={u._id}
                                className="bg-white border rounded-lg hover:bg-gray-50 transition"
                            >
                                {/* Name + Avatar */}
                                <td className="flex items-center gap-3 py-2 px-5 sm:px-3 lg:px-0">
                                    <img
                                        src={u.avatar}
                                        alt={u.name}
                                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full object-cover"
                                    />
                                    <span className="font-medium text-gray-800">{u.name}</span>
                                </td>

                                {/* Email */}
                                {/* <td className="text-gray-600">{u.email}</td> */}
                                <td className="text-gray-600 max-w-[260px] truncate px-10 sm:px-2 lg:px-0" title={u.email}>
                                    {u.email}
                                </td>


                                {/* Role */}
                                <td className="px-7 sm:px-2 lg:px-0">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${u.role === "admin"
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {u.role}
                                    </span>
                                </td>

                                {/* Joined */}
                                <td className="px-10 sm:px-2 lg:px-5 text-gray-500">
                                    {new Date(u.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>

                                {/* Status (read-only) */}
                                <td className="px-8 sm:px-2 lg:px-6">
                                    <span className="inline-flex px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No customers found
                </div>
            )}
        </div>
    );
};

export default Customers;
