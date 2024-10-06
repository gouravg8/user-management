interface Geo {
	lat: string;
	lng: string;
}

interface Address {
	street: string;
	suite?: string;
	city: string;
	zipcode?: string;
	geo?: Geo;
}

interface Company {
	name: string;
	catchPhrase?: string;
	bs?: string;
}

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

interface UserModalProps {
	data: User | null;
	isOpen: boolean;
	onSubmit: () => void;
	onClose: () => void;
	onSubmitHandler: (data: User) => void;
}

interface FieldType {
	name: string;
	lable: string;
	type: string | number;
	placeholder: string;
	required: boolean;
	value: string;
}

export type { User, Geo, Address, Company, UserModalProps, FieldType };
