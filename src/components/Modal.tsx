import type React from "react";
import { useState, useEffect, useRef } from "react";
import type { Address } from "../types";

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

	const handleCloseModal = () => {
		if (onClose) {
			onClose();
		}
		setModalOpen(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Escape") {
			handleCloseModal();
		}
	};

	useEffect(() => {
		setModalOpen(isOpen);
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
			className="p-4 rounded-lg w-3/4"
		>
			{children}
			{hasCloseBtn && (
				<button
					type="button"
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
					onClick={handleCloseModal}
				>
					Close
				</button>
			)}
		</dialog>
	);
};

interface NewsletterModalData {
	name: string;
	email: string;
	phone: number;
	username: string;
	address: Address;
	company: string;
	website: string;
}

const initialNewsletterModalData: NewsletterModalData = {
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

interface NewsletterModalProps {
	isOpen: boolean;
	onSubmit: (data: NewsletterModalData) => void;
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

const NewsletterModal: React.FC<NewsletterModalProps> = ({
	onSubmit,
	isOpen,
	onClose,
}) => {
	const focusInputRef = useRef<HTMLInputElement | null>(null);
	const [formState, setFormState] = useState<NewsletterModalData>(
		initialNewsletterModalData,
	);

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
			}, 0);
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
		setFormState(initialNewsletterModalData);
	};

	return (
		<Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center align-middle gap-4"
			>
				{fields.map((field: FieldType) => (
					<div
						key={field.name}
						className="flex flex-col justify-center align-middle"
					>
						<label htmlFor={field.name}>{field.lable}</label>
						<input
							className="border border-slate-400 rounded-md px-2 py-1"
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
	const [isNewsletterModalOpen, setNewsletterModalOpen] =
		useState<boolean>(false);
	const [newsletterFormData, setNewsletterFormData] =
		useState<NewsletterModalData | null>(null);

	const handleOpenNewsletterModal = () => {
		setNewsletterModalOpen(true);
	};

	const handleCloseNewsletterModal = () => {
		setNewsletterModalOpen(false);
	};

	const handleFormSubmit = (data: NewsletterModalData): void => {
		setNewsletterFormData(data);
		handleCloseNewsletterModal();
	};

	return (
		<>
			<div style={{ display: "flex", gap: "1em" }}>
				<button
					className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-red-300"
					type="button"
					onClick={handleOpenNewsletterModal}
				>
					{modalTitle}
				</button>
			</div>

			{newsletterFormData && (
				<div className="msg-box">
					<b>{JSON.stringify(newsletterFormData)}</b>
				</div>
			)}

			<NewsletterModal
				isOpen={isNewsletterModalOpen}
				onSubmit={handleFormSubmit}
				onClose={handleCloseNewsletterModal}
			/>
		</>
	);
};

export default ModalCompo;
