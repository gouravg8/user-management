import type React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalOpner } from "./Modal";
import type { SubmitHandler } from "react-hook-form";
import type { FormDataType } from "../types/zodSchema";
import { useEffect, useMemo, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

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
	const { userId } = useParams();
	const navigate = useNavigate();
	const usersFromLocalStorage = JSON.parse(
		localStorage.getItem("users") || "[]",
	);
	const [user, setUserData] = useState<User>();
	const filtredUser = useMemo(
		() => usersFromLocalStorage.find((u: User) => u.id === Number(userId)),
		[usersFromLocalStorage, userId],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (filtredUser) {
			filtredUser.phone = filtredUser.phone
				.split(" ")[0]
				.replace(/[\-.()]/g, "");
		}
		setUserData(filtredUser);
	}, []);

	const onSubmitHandler: SubmitHandler<FormDataType> = async (data) => {
		const updatedUsers = usersFromLocalStorage.map((user: User) =>
			user.id === data.id ? data : user,
		);
		localStorage.setItem("users", JSON.stringify(updatedUsers));

		setUserData(data as User);
		console.log({ data });
	};

	const handleDelete = (id: number) => {
		console.log("Delete user with id:", id);
		const updatedUsers = usersFromLocalStorage.filter(
			(user: User) => user.id !== id,
		);
		localStorage.setItem("users", JSON.stringify(updatedUsers));
		navigate("/");
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full h-screen mx-auto py-16 bg-slate-800 flex flex-col gap-8">
			<Link to="/" className="hover:underline w-fit mx-auto">
				<h1 className="flex items-center gap-1 font-semibold text-white w-fit border border-orange-800 bg-orange-600 px-4 py-2 rounded-full">
					<RiArrowLeftLine /> User management
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
					<ModalOpner
						modalTitle="Edit"
						data={user}
						classNames="bg-slate-900 hover:bg-slate-950 text-white px-4 py-4 w-1/2"
						onSubmitHandler={onSubmitHandler}
					/>
					<button
						type="button"
						className="bg-slate-900 hover:bg-slate-950 text-white px-4 py-3 w-1/2"
						onClick={() => {
							const confirmDelete = window.confirm(
								"Are you sure you want to delete this user?",
							);
							if (confirmDelete) {
								handleDelete(user.id);
							}
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
export default DetailedUser;
