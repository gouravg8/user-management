import type React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
	return (
		<div className="w-full mx-auto min-h-screen flex flex-col items-center justify-center bg-slate-800">
			<div className="w-11/12 text-center flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold text-red-500">
					Oops! Something went wrong.
				</h1>
				<p className="mt-4 text-lg text-gray-500">
					We can't seem to find the page you're looking for.
				</p>
				<Link to="/" className="mt-6 bg-primary text-white px-4 py-2 rounded">
					Go back to Home
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
