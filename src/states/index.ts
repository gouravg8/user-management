import { atom, selector } from "recoil";
import { initialUserModalData } from "../components/UserModalForm";
import type { User } from "../types";

const userAtom = atom({
	key: "user",
	default: initialUserModalData,
});

const userSelector = selector({
	key: "userSelector",
	get: async ({ get }): Promise<User> => {
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

export const usersAtom = atom<User[]>({
	key: "usersState",
	default: [initialUserModalData],
});

export const addUserAction = selector<User>({
	key: "addUserAction",
	get: ({ get }) => get(usersAtom)[0] || null,
	set: ({ set }, newUser) => {
		set(usersAtom, (prev: User[]) => [newUser as User, ...prev]);
	},
});

export { userAtom, userSelector };
