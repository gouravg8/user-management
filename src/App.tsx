import "./App.css";
import Table from "./components/Table";
import { ModalOpner } from "./components/Modal";
import { useLoaderData } from "react-router-dom";
import type { User } from "./types";
import axios from "axios";
import type { SubmitHandler } from "react-hook-form";
import type { FormDataType } from "./types/zodSchema";
import { useEffect, useState } from "react";
// import Userapp from "./components/Userapp";

function App() {
	const dataLoaded = useLoaderData() as User[];
	const [users, setUsers] = useState<User[]>(dataLoaded);
	useEffect(() => setUsers(dataLoaded), [dataLoaded]);

	const onSubmitHandler: SubmitHandler<FormDataType> = async (data) => {
		const postData = await axios.post(
			"https://jsonplaceholder.typicode.com/users",
			data,
		);
		console.log({ postData });
	};

	return (
		<div className="flex flex-col gap-8 bg-slate-800 justify-start py-16 h-screen">
			<h1 className="font-semibold text-white border w-fit mx-auto border-orange-800 bg-orange-600 px-4 py-2 rounded-full">
				User management
			</h1>
			<Table users={users} />
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
