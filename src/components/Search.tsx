import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const navigate = useNavigate();
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const [isInputFocused, setIsInputFocused] = useState(false);

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
		navigate(`/user/${userId}`);
		setSearchTerm("");
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				event.preventDefault();
				searchInputRef.current?.focus();
			} else if (event.key === "Escape") {
				searchInputRef.current?.blur();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		const checkFocus = () => {
			setIsInputFocused(searchInputRef.current === document.activeElement);
		};

		document.addEventListener("focusin", checkFocus);
		document.addEventListener("focusout", checkFocus);

		return () => {
			document.removeEventListener("focusin", checkFocus);
			document.removeEventListener("focusout", checkFocus);
		};
	}, []);

	return (
		<>
			{isInputFocused && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
			)}
			<div className="w-11/12 max-w-md mx-auto fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
				<div className="relative">
					<input
						type="text"
						placeholder="Search users by name"
						value={searchTerm}
						ref={searchInputRef}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2.5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<span className="absolute bg-gray-900 font-semibold px-2.5 py-1 rounded-lg right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
						Ctrl + K
					</span>
				</div>
				{searchResults.length > 0 && (
					<ul className="mt-4 bg-gray-700 rounded-md shadow-md animate-fadeIn">
						{searchResults.map((user) => (
							<li
								key={user.id}
								className="cursor-pointer border-b p-2.5 border-gray-800 text-white last:border-b-0 animate-fadeIn "
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
