import { atom, selector } from "recoil";
import { initialUserModalData } from "../components/UserModalForm";
import type { User } from "../types";

const usersAtom = atom({
	key: "users",
	default: [initialUserModalData],
});

const userAtom = atom({
	key: "user",
	default: initialUserModalData,
});

const userSelector = selector({
	key: "userSelector",
	get: async ({ get }) => {
		const data = get(userAtom);
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/users/${data.id}`,
		);
		const json = await res.json();
		const cleanedData = {
			...json,
			phone: json.phone.split(" ")[0].replace(/[.\-()]/g, ""),
		};
		return cleanedData;
	},
	set: ({ set }, newValue) => {
		set(userAtom, newValue);
	},
});

const usersSelector = selector({
	key: "usersSelector",
	get: async ({ get }) => {
		const data = get(usersAtom);
		const res = await fetch("https://jsonplaceholder.typicode.com/users");
		const json = await res.json();

		const cleanedData = json.map((user: User) => ({
			...user,
			phone: user.phone.split(" ")[0].replace(/[.\-()]/g, ""),
		}));
		return cleanedData;
	},
	set: ({ set }, newValue) => {
		set(usersAtom, newValue);
	},
});

export { usersAtom, usersSelector, userAtom, userSelector };
