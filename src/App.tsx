import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import ModalCompo from "./components/Modal";

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/users");
			const userData = await res.json();
			setData(userData);
		};
		fetchData();
	}, []);
	return (
		<div className="flex flex-col gap-8 justify-center items-center mt-16">
			<h1 className="font-semibold text-white border border-orange-800 bg-orange-600 px-4 py-2 rounded-full">
				User management
			</h1>
			<Table users={data} />
			<ModalCompo modalTitle="Create User" />
		</div>
	);
}

export default App;
