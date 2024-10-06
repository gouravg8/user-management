import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type FormDataType, userSchema } from "../types/zodSchema";
import { Modal } from "./Modal";
import type { UserModalProps, User, FieldType } from "../types";

const initialUserModalData: User = {
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

const UserModalForm: React.FC<UserModalProps> = ({
	data,
	onSubmit,
	isOpen,
	onClose,
	onSubmitHandler,
}) => {
	const focusInputRef = useRef<HTMLInputElement | null>(null);
	const [formState, setFormState] = useState<User>(
		data ?? initialUserModalData,
	);
	const [dataSubmitLoading, setDataSubmitLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>({
		resolver: zodResolver(userSchema),
	});

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
			name: "address.street",
			lable: "Street",
			type: "text",
			placeholder: "Enter your address(Street)",
			required: false,
			value: formState.address.street,
		},
		{
			name: "address.city",
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
			value: formState.company.name,
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
		setFormState((prevFormData) => {
			if (name.includes(".")) {
				const [parent, child] = name.split(".");
				return {
					...prevFormData,
					[parent]: {
						...(prevFormData[
							parent as keyof typeof prevFormData
						] as unknown as Record<string, unknown>),
						[child]: value,
					},
				};
			}
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	// const onSubmitHandler: SubmitHandler<FormDataType> = async (data) => {
	// 	setDataSubmitLoading(true);
	// 	const postData = await axios.post(
	// 		"https://jsonplaceholder.typicode.com/users",
	// 		data,
	// 	);
	// 	setDataSubmitLoading(false);
	// 	console.log({ postData });
	// 	onSubmit();
	// };

	return (
		<Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
			<form
				onSubmit={handleSubmit(async () => {
					setDataSubmitLoading(true);
					await onSubmitHandler(formState);
					setDataSubmitLoading(false);
					onSubmit();
				})}
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
							type={field.type as React.HTMLInputTypeAttribute}
							{...register(
								field.name as
									| "name"
									| "email"
									| "phone"
									| "username"
									| "companyName"
									| "website"
									| "address.street"
									| "address.city",
							)}
							value={field.value}
							onChange={handleInputChange}
							placeholder={field.placeholder}
							required={field.required}
						/>
						{errors[field.name as keyof FormDataType] && (
							<p className="text-red-500 text-sm mt-1">
								{errors[field.name as keyof FormDataType]?.message}
							</p>
						)}
					</div>
				))}{" "}
				<div className="">
					<button
						className="w-full mx-auto text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-2 mt-4"
						type="submit"
					>
						{dataSubmitLoading ? "loading..." : "Submit"}
					</button>
				</div>
			</form>
		</Modal>
	);
};
export default UserModalForm;
