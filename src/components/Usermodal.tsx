import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
}

const UserTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
				alert("s fetching users");
			});
	}, []);

	const handleEdit = (id: number) => {
		// Add your edit logic here
		console.log("Edit user with id:", id);
	};

	const handleDelete = (id: number) => {
		// Add your delete logic here
		console.log("Delete user with id:", id);
	};

	return (
		<div className="w-fulll mx-auto py-4">
			<table className="w-full bg-white shadow-md rounded-lg">
				<thead className="hidden md:table-header-group">
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Name</th>
						<th className="py-2 px-4 border-b">Email</th>
						<th className="py-2 px-4 border-b">Phone</th>
						<th className="py-2 px-4 border-b">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr
							key={user.id}
							className={index % 2 ? "bg-gray-100" : "bg-white"}
						>
							<td className="py-2 px-4 border-b block md:table-cell">
								{user.id}
							</td>
							<td className="py-2 px-4 border-b block md:table-cell">
								{user.name}
							</td>
							<td className="py-2 px-4 border-b block md:table-cell">
								{user.email}
							</td>
							<td className="py-2 px-4 border-b block md:table-cell">
								{user.phone}
							</td>
							<td className="py-2 px-4 border-b block md:table-cell">
								<button
									type="submit"
									className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
									onClick={() => handleEdit(user.id)}
								>
									Edit
								</button>
								<button
									type="submit"
									className="bg-red-500 text-white px-2 py-1 rounded"
									onClick={() => handleDelete(user.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
