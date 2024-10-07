import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
		if (searchTerm) {
			const filteredUsers = users.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);
			setSearchResults(filteredUsers);
		} else {
			setSearchResults([]);
		}
	}, [searchTerm]);

	const handleClick = (userId: number) => {
		console.log(userId);

		navigate(`/user/${userId}`);
		setSearchTerm("");
	};

	return (
		<>
			{searchResults.length > 0 && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
			)}
			<div className="w-11/12 max-w-md mx-auto fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
				<input
					type="text"
					placeholder="Search users by name"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full px-4 py-2.5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				{searchResults.length > 0 && (
					<ul className="mt-4 bg-gray-700 rounded-md shadow-md animate-fadeIn">
						{searchResults.map((user) => (
							<li
								key={user.id}
								className="border-b p-2.5 border-gray-800 text-white last:border-b-0 animate-fadeIn "
								onClick={() => handleClick(user.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleClick(user.id);
									}
								}}
							>
								{user.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default Search;
