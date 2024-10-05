import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import type { User } from "../types";

const Table = ({ users }: { users: User[] })=> {
	return (
		<div className="w-11/12 px-2 py-4 mx-4 border border-slate-400 items-center rounded">
			<table className="w-full mx-auto">
				<thead>
					<tr>
						<th className="px-2 text-left">Name</th>
						<th className="px-2 text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: User, index: number) => {
						return (
							<tr
								className={`${(index + 1) % 2 === 0 && "rounded-lg bg-orange-300 "} text-orange-800 font-base`}
								key={user.id}
							>
								<td className="pl-2 py-1.5">{user.name}</td>
								<td className="text-center flex text-3xl py-1 justify-around align-middle">
									<MdEdit className="p-1" />
									<MdDelete className="p-1" />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
