import "./App.css";
import Table from "./components/Table";
import { ModalCompo } from "./components/Modal";
import { useLoaderData } from "react-router-dom";
import type { User } from "./types";
// import Userapp from "./components/Userapp";

function App() {
	const { data } = useLoaderData() as { data: User[] };
	return (
		<div className="flex flex-col gap-8 bg-slate-800 justify-start py-16 h-screen">
			<h1 className="font-semibold text-white border w-fit mx-auto border-orange-800 bg-orange-600 px-4 py-2 rounded-full">
				User management
			</h1>
			<Table users={data} />
			<ModalCompo modalTitle="Create User" />
			{/* <Userapp /> */}
			{/* <DetailedUser /> */}
		</div>
	);
}
export default App;
