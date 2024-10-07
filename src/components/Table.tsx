import { Link } from "react-router-dom";
import type { User } from "../types";

const Table = () => {
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	return (
		<>
			<div className="w-11/12 md:w-1/2 md:mx-auto md:p-8 md:rounded-lg px-2 bg-slate-700 py-4 mx-4 text-white items-center rounded z-20">
				<table className="w-full mx-auto">
					<thead>
						<tr>
							<th className="px-2 text-left">Name</th>
							<th className="px-2 text-left">Number</th>
						</tr>
					</thead>
					<tbody>
						{users.length &&
							users.map((user: User, index: number) => {
								return (
									<tr
										className={`${(index + 1) % 2 === 0 && "rounded-lg bg-gray-600 "} text-white font-base`}
										key={user.id}
									>
										<td className="pl-2 py-1.5 md:py-2">
											<Link to={`/user/${user.id}`}>{user.name}</Link>
										</td>
										<td className="">
											{user.phone.split(" ")[0].replace(/[-.()]/g, "")}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};
export default Table;
