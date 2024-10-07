import "./App.css";
import Table from "./components/Table";
import { ModalOpner } from "./components/Modal";
import axios from "axios";
import type { SubmitHandler } from "react-hook-form";
import type { FormDataType } from "./types/zodSchema";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import Search from "./components/Search";
import TableSkeleton from "./components/TableSkeleton";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const usersFromLocalStorage = JSON.parse(
		localStorage.getItem("users") || "[]",
	);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const res = await fetch("https://jsonplaceholder.typicode.com/users");
			const data = await res.json();
			localStorage.setItem("users", JSON.stringify(data));
			console.log(data);
			setIsLoading(false);
		}
		if (usersFromLocalStorage.length === 0) {
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
			localStorage.setItem(
				"users",
				JSON.stringify([postData.data, ...usersFromLocalStorage]),
			);
			console.log("New user added:", postData.data, postData);
			setIsLoading(false);
		} catch (error) {
			console.error("Error adding new user:", error);
			alert("Error adding new user");
		}
	};

	if (isLoading) {
		return <TableSkeleton />;
	}

	const handleReload = async () => {
		const res = await fetch("https://jsonplaceholder.typicode.com/users");
		const data = await res.json();
		localStorage.setItem("users", JSON.stringify(data));
	};

	return (
		<div className="flex flex-col gap-8 bg-slate-800 justify-start py-16 h-screen">
			<Search />
			<h1
				onClick={handleReload}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleReload();
					}
				}}
				className="flex gap-1 items-center md:cursor-pointer font-semibold text-white border w-fit mx-auto border-orange-800 bg-orange-600 px-4 py-2 rounded-full mt-12 z-20"
			>
				<IoReload />
				User management
			</h1>
			<Table />
			<ModalOpner
				modalTitle="Create User"
				data={null}
				classNames="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-red-300 fixed bottom-4 left-1/2 -translate-x-12"
				onSubmitHandler={onSubmitHandler}
			/>
		</div>
	);
}
export default App;
