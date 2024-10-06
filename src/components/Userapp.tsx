import type React from "react";
import UserTable from "./Usermodal";

const Userapp: React.FC = () => {
	return (
		<div className="w-11/12">
			<header className="bg-blue-500 text-white py-4">
				<h1>User Management System</h1>
			</header>
			<UserTable />
		</div>
	);
};

export default Userapp;
