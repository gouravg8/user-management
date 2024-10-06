import type React from "react";
import { useState, useEffect, useRef } from "react";
import type { Address } from "../types";
import "./styles/Modal.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
	isOpen: boolean;
	hasCloseBtn?: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	hasCloseBtn = true,
	onClose,
	children,
}) => {
	const [isModalOpen, setModalOpen] = useState(isOpen);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);

	const handleCloseModal = () => {
		setIsAnimating(true);
		setTimeout(() => {
			if (onClose) {
				onClose();
			}

			setModalOpen(false);
		}, 100);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Escape") {
			handleCloseModal();
		}
	};

	useEffect(() => {
		setModalOpen(isOpen);
		if (isOpen) setIsAnimating(true);
	}, [isOpen]);

	useEffect(() => {
		const modalElement = modalRef.current;

		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isModalOpen]);

	return (
		<dialog
			ref={modalRef}
			onKeyDown={handleKeyDown}
			className={`modal-overlay ${isModalOpen ? "open" : "close"} p-4 bg-slate-700 text-white w-11/12 rounded-lg relative`}
		>
			<div className={`modal-content ${isModalOpen ? "open" : "close"}`}>
				{hasCloseBtn && (
					<button
						type="button"
						className="absolute top-3 right-3 float-end text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
						onClick={handleCloseModal}
					>
						<RiCloseLine size={24} />
					</button>
				)}
				{children}
			</div>
		</dialog>
	);
};

interface UserModalData {
	name: string;
	email: string;
	phone: number;
	username: string;
	address: Address;
	company: string;
	website: string;
}

const initialUserModalData: UserModalData = {
	name: "",
	email: "",
	phone: 0,
	username: "",
	address: {
		street: "",
		city: "",
	},
	company: "",
	website: "",
};

interface UserModalProps {
	isOpen: boolean;
	onSubmit: (data: UserModalData) => void;
	onClose: () => void;
}

interface FieldType {
	name: string;
	lable: string;
	type: string;
	placeholder: string;
	required: boolean;
	value: string;
}

const UserModal: React.FC<UserModalProps> = ({ onSubmit, isOpen, onClose }) => {
	const focusInputRef = useRef<HTMLInputElement | null>(null);
	const [formState, setFormState] =
		useState<UserModalData>(initialUserModalData);

	const fields: FieldType[] = [
		{
			name: "name",
			lable: "Name",
			type: "text",
			placeholder: "Enter your name",
			required: true,
			value: formState.name,
		},
		{
			name: "email",
			lable: "Email",
			type: "email",
			placeholder: "Enter your email",
			required: true,
			value: formState.email,
		},
		{
			name: "phone",
			lable: "Phone",
			type: "number",
			placeholder: "Enter your phone number",
			required: true,
			value: formState.phone.toString(),
		},
		{
			name: "username",
			lable: "Username",
			type: "text",
			placeholder: "Enter your username",
			required: true,
			value: formState.username,
		},
		{
			name: "street",
			lable: "Street",
			type: "text",
			placeholder: "Enter your address(Street)",
			required: false,
			value: formState.address.street,
		},
		{
			name: "city",
			lable: "City",
			type: "text",
			placeholder: "Enter your address(city)",
			required: false,
			value: formState.address.city,
		},

		{
			name: "company",
			lable: "Company",
			type: "text",
			placeholder: "Enter your company name",
			required: false,
			value: formState.company,
		},
		{
			name: "website",
			lable: "Website",
			type: "text",
			placeholder: "https://example.com",
			required: false,
			value: formState.website,
		},
	];

	useEffect(() => {
		if (isOpen && focusInputRef.current) {
			setTimeout(() => {
				focusInputRef.current?.focus();
			}, 300);
		}
	}, [isOpen]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		onSubmit(formState);
		setFormState(initialUserModalData);
	};

	return (
		<Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center align-middle gap-4 mt-8"
			>
				{fields.map((field: FieldType) => (
					<div
						key={field.name}
						className="flex flex-col justify-center align-middle"
					>
						<label className="font-medium" htmlFor={field.name}>
							{field.lable}
						</label>
						<input
							className="border-0 rounded-md px-3 py-1.5 bg-slate-800 placeholder:text-sm"
							ref={focusInputRef}
							type={field.type}
							name={field.name}
							value={field.value}
							onChange={handleInputChange}
							placeholder={field.placeholder}
							required={field.required}
						/>
					</div>
				))}
				<div className="">
					<button
						className="w-full mx-auto text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-red-300 mb-2 mt-4"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</Modal>
	);
};

const ModalCompo = ({ modalTitle }: { modalTitle: string }) => {
	const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);
	const [userFormData, setUserFormData] = useState<UserModalData | null>(null);

	const handleOpenUserModal = () => {
		setUserModalOpen(true);
	};

	const handleCloseUserModal = () => {
		setUserModalOpen(false);
	};

	const handleFormSubmit = (data: UserModalData): void => {
		setUserFormData(data);
		handleCloseUserModal();
	};

	return (
		<>
			<div style={{ display: "flex", gap: "1em" }}>
				<button
					className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-red-300 fixed bottom-4 left-1/2 -translate-x-12"
					type="button"
					onClick={handleOpenUserModal}
				>
					{modalTitle}
				</button>
			</div>

			{userFormData && (
				<div className="msg-box">
					<b>{JSON.stringify(userFormData)}</b>
				</div>
			)}

			<UserModal
				isOpen={isUserModalOpen}
				onSubmit={handleFormSubmit}
				onClose={handleCloseUserModal}
			/>
		</>
	);
};

export default ModalCompo;
