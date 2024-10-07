import type React from "react";

const Skeleton: React.FC = () => {
	return (
		<div className="w-11/12 mx-auto py-12 animate-pulse">
			<div className="h-8 bg-gray-400 rounded w-3/4 mb-4" />
			<div className="h-4 bg-gray-400 rounded w-1/2 mb-2" />
			<div className="h-4 bg-gray-400 rounded w-2/3 mb-2" />
			<div className="h-4 bg-gray-400 rounded w-1/3 mb-2" />
			<div className="h-4 bg-gray-400 rounded w-1/2 mb-2" />
			<div className="h-20 bg-gray-400 rounded w-full mb-4" />
			<div className="h-8 bg-gray-400 rounded w-1/4 mb-2" />
			<div className="h-4 bg-gray-400 rounded w-3/4 mb-2" />
			<div className="h-4 bg-gray-400 rounded w-1/2 mb-2" />
		</div>
	);
};
export default Skeleton;
