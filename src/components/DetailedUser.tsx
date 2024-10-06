import type React from "react";
import { Link, useLoaderData } from "react-router-dom";

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	username: string;
	website: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

const DetailedUser: React.FC = () => {
	const { data: user } = useLoaderData() as { data: User };

	const handleEdit = (id: number) => {
		// Add your edit logic here
		console.log("Edit user with id:", id);
	};

	const handleDelete = (id: number) => {
		// Add your delete logic here
		console.log("Delete user with id:", id);
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full h-screen mx-auto py-16 bg-slate-800">
			<Link to="/" className="hover:underline">
				<h1 className="font-semibold text-white border w-fit mx-auto border-orange-800 bg-orange-600 px-4 py-2 rounded-full mb-8">
					User management
				</h1>
			</Link>
			<div className="w-11/12 mx-auto bg-slate-700 shadow-lg rounded-lg overflow-hidden text-white">
				<h2 className="text-4xl p-4 font-bold text-white">{user.name}</h2>
				<div className="px-4 pb-4">
					<p>
						<strong className="">Username: </strong>
						{user.username}
					</p>
					<p>
						<strong className="">Email:</strong> {user.email}
					</p>
					<p>
						<strong className="">Phone:</strong> {user.phone}
					</p>
					<p>
						<strong className="">Website:</strong> {user.website}
					</p>
					<h3 className="text-xl font-bold  mt-4">Address</h3>
					<p>
						{user.address.street}, {user.address.suite}
					</p>
					<p>
						{user.address.city}, {user.address.zipcode}
					</p>
					<h3 className="text-xl font-bold mt-4">Company</h3>
					<p>
						<strong className="">Name:</strong> {user.company.name}
					</p>
					<p>
						<strong className="">Catchphrase:</strong>{" "}
						{user.company.catchPhrase}
					</p>
					<p>
						<strong className="">BS:</strong> {user.company.bs}
					</p>
				</div>
				<div className="flex justify-arounds align-middle w-full ">
					<button
						type="button"
						className="text-white bg-slate-900 hover:bg-slate-950 px-4 py-2 w-1/2"
						onClick={() => handleEdit(user.id)}
					>
						Edit
					</button>
					<button
						type="button"
						className="bg-slate-900 hover:bg-slate-950  text-white px-4 py-3 w-1/2"
						onClick={() => handleDelete(user.id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DetailedUser;
