import type React from "react";
import { useState, useEffect, useRef } from "react";
import "./styles/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import UserModalForm from "./UserModalForm";
import type { User } from "../types";

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
			className={`modal-overlay ${isModalOpen ? "open" : "close"} p-4 bg-slate-700 text-white w-11/12 rounded-lg relative md:w-1/2`}
		>
			<div className={`modal-content ${isModalOpen ? "open" : "close"}`}>
				{hasCloseBtn && (
					<button
						type="button"
						className="absolute top-3 right-3 float-end text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
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

const ModalOpner = ({
	modalTitle,
	data,
	classNames,
	onSubmitHandler,
}: {
	modalTitle: string;
	data: User | null;
	classNames: string;
	onSubmitHandler: (data: User) => void;
}) => {
	const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);

	const handleOpenUserModal = () => {
		setUserModalOpen(true);
	};

	const handleCloseUserModal = () => {
		setUserModalOpen(false);
	};

	const handleFormSubmit = (): void => {
		handleCloseUserModal();
	};

	return (
		<>
			<button
				className={classNames}
				type="button"
				onClick={handleOpenUserModal}
			>
				{modalTitle}
			</button>

			<UserModalForm
				data={data}
				isOpen={isUserModalOpen}
				onSubmit={handleFormSubmit}
				onClose={handleCloseUserModal}
				onSubmitHandler={onSubmitHandler}
			/>
		</>
	);
};

export { ModalOpner, Modal };
