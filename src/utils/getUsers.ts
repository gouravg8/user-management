import axios from "axios";

async function getUsers() {
	const users = await axios.get("https://jsonplaceholder.typicode.com/users");
	return users;
}

async function getUserDetails(userId: number) {
	const user = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${userId}`,
	);
	return user;
}

export { getUsers, getUserDetails };
