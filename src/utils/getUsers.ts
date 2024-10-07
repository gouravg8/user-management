import axios from "axios";
import type { User } from "../types";

async function getUsers() {
	try {
		const res = await axios.get<User[]>(
			"https://jsonplaceholder.typicode.com/users",
		);

		const users = res.data.map((user) => ({
			...user,
			phone: user.phone.split(" ")[0].replace(/[.\-()]/g, ""),
		}));
		return users;
	} catch (error) {
		console.log(error);
		alert("Error fetching users");
	}
}

async function getUserDetails(userId: number) {
	try {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${userId}`,
		);
		const user = {
			...res.data,
			phone: res.data.phone.split(" ")[0].replace(/[.\-()]/g, ""),
		};
		return user;
	} catch (error) {
		console.log(error);
		alert("Error fetching user details");
	}
}

export { getUsers, getUserDetails };
