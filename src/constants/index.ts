import type { User } from "../types";

export const initialUserModalData: User = {
	id: 0,
	name: "",
	email: "",
	phone: "",
	username: "",
	address: {
		street: "",
		city: "",
	},
	company: { name: "" },
	website: "",
};