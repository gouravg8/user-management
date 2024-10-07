import "./App.css";
import Table from "./components/Table";
import { ModalOpner } from "./components/Modal";
import axios from "axios";
import type { SubmitHandler } from "react-hook-form";
import type { FormDataType } from "./types/zodSchema";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";

function App() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const usersFromLocalStorage = JSON.parse(
		localStorage.getItem("users") || "[]",
	);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch("https://jsonplaceholder.typicode.com/users");
			const data = await res.json();
			localStorage.setItem("users", JSON.stringify(data));
			setUsers(data);
			console.log(data);
		}
		if (!usersFromLocalStorage) {
			fetchData();
		}
	}, [usersFromLocalStorage]);

	const onSubmitHandler: SubmitHandler<FormDataType> = async (data) => {
		try {
			setIsLoading(true);
			const postData = await axios.post(
				"https://jsonplaceholder.typicode.com/users",
				data,
			);
			localStorage.setItem("users", JSON.stringify([postData.data, ...users]));
			console.log("New user added:", postData.data, postData);
			setIsLoading(false);
		} catch (error) {
			console.error("Error adding new user:", error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleReload = async () => {
		const res = await fetch("https://jsonplaceholder.typicode.com/users");
		const data = await res.json();
		localStorage.setItem("users", JSON.stringify(data));
		setUsers(data);
	};

	return (
		<div className="flex flex-col gap-8 bg-slate-800 justify-start py-16 h-screen">
			<h1
				onClick={handleReload}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleReload();
					}
				}}
				className="flex gap-1 items-center font-semibold text-white border w-fit mx-auto border-orange-800 bg-orange-600 px-4 py-2 rounded-full"
			>
				<IoReload />
				User management
			</h1>
			<Table />
			<ModalOpner
				modalTitle="Create User"
				data={null}
				classNames="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-red-300 fixed bottom-4 left-1/2 -translate-x-12"
				onSubmitHandler={onSubmitHandler}
			/>
		</div>
	);
}
export default App;
