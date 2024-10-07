import type React from "react";

const TableSkeleton: React.FC = () => {
	return (
		<div className="w-full px-8 bg-slate-700 h-screen text-white items-center rounded z-20">
			<div className="animate-pulse py-44">
				<div className="bg-gray-300 h-10 w-full mb-4 rounded" />
				{[...Array(5)].map(() => (
					<div
						key={`row-${crypto.randomUUID()}`}
						className="flex justify-center space-x-4 mb-4"
					>
						<div className="bg-gray-300 h-8 w-1/2 rounded" />
						<div className="bg-gray-300 h-8 w-1/2 rounded" />
					</div>
				))}
			</div>
		</div>
	);
};

export default TableSkeleton;
