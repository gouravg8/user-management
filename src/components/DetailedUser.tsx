import type React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalOpner } from "./Modal";
import type { SubmitHandler } from "react-hook-form";
import type { FormDataType } from "../types/zodSchema";
import { useEffect, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import type { User } from "../types";
import Skeleton from "./DetailedUserSkeleton";
import Search from "./Search";
import UserInfoItem from "./UserInfoItem";

const DetailedUser: React.FC = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const usersFromLocalStorage = JSON.parse(
		localStorage.getItem("users") || "[]",
	);
	const [user, setUserData] = useState<User>();

	const [isLoading, setIsLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const filtredUser = usersFromLocalStorage.find(
			(u: User) => u.id === Number(userId),
		);
		setIsLoading(true);
		if (filtredUser) {
			filtredUser.phone = filtredUser.phone
				.split(" ")[0]
				.replace(/[-.()]/g, "");
		}
		setUserData(filtredUser);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [userId]);

	const onSubmitHandler: SubmitHandler<FormDataType> = async (data) => {
		setIsLoading(true);
		const updatedUsers = usersFromLocalStorage.map((user: User) =>
			user.id === data.id ? data : user,
		);
		localStorage.setItem("users", JSON.stringify(updatedUsers));

		setUserData(data as User);
		setIsLoading(false);
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
		return (
			<div className="w-full h-screen mx-auto py-16 bg-slate-800 flex flex-col gap-8">
				No user found
			</div>
		);
	}

	return (
		<div className="w-full h-screen mx-auto py-16 bg-slate-800 flex flex-col gap-8">
			<Search />
			<Link to="/" className="w-fit mx-auto mt-12">
				<h1 className="flex items-center gap-1 font-semibold text-white w-fit border border-orange-800 bg-orange-600 px-4 py-2 rounded-full">
					<RiArrowLeftLine /> User management
				</h1>
			</Link>
			<div className="w-11/12 pt-6 md:px-8 md:py-6 md:w-1/2 mx-auto bg-slate-700 shadow-lg rounded-lg overflow-hidden text-white">
				{isLoading ? (
					<Skeleton />
				) : (
					<>
						<h2 className="text-4xl p-4 font-bold text-white">{user.name}</h2>
						<div className="px-4 pb-4">
							<UserInfoItem label="Username" value={user.username} />
							<UserInfoItem label="Email" value={user.email} />
							<UserInfoItem label="Phone" value={user.phone} />
							<UserInfoItem label="Website" value={user.website} />

							<h3 className="text-xl font-bold mt-4">Address</h3>
							<UserInfoItem
								label="Street"
								value={`${user.address.street}, ${user.address.suite}`}
							/>
							<UserInfoItem
								label="City"
								value={`${user.address.city}, ${user.address.zipcode}`}
							/>

							<h3 className="text-xl font-bold mt-4">Company</h3>
							<UserInfoItem label="Name" value={user.company.name} />
							{user.company.catchPhrase && (
								<UserInfoItem
									label="Catchphrase"
									value={user.company.catchPhrase}
								/>
							)}
							{user.company.bs && (
								<UserInfoItem label="BS" value={user.company.bs} />
							)}
						</div>
						<div className="flex justify-arounds align-middle w-full md:mt-4 md:mx-auto md:gap-2 ">
							<ModalOpner
								modalTitle="Edit"
								data={user}
								classNames="bg-slate-900 hover:bg-slate-950 text-white px-4 py-4 w-1/2 md:rounded-md"
								onSubmitHandler={onSubmitHandler}
							/>
							<button
								type="button"
								className="bg-slate-900 hover:bg-slate-950 text-white px-4 py-3 w-1/2 md:rounded-md"
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
					</>
				)}
			</div>
		</div>
	);
};
export default DetailedUser;
