import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
	RouterProvider,
	createRoutesFromElements,
	createBrowserRouter,
	Route,
} from "react-router-dom";
import DetailedUser from "./components/DetailedUser.tsx";
import { getUserDetails, getUsers } from "./utils/getUsers.ts";
import ErrorPage from "./components/Error.tsx";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" errorElement={<ErrorPage />}>
			<Route path="" element={<App />} loader={async () => await getUsers()} />
			<Route
				path="user/:userId"
				element={<DetailedUser />}
				loader={async ({ params }) =>
					await getUserDetails(Number(params.userId))
				}
			/>
		</Route>,
	),
);

createRoot(
	document.getElementById("root") || document.createElement("div"),
).render(
	<StrictMode>
		<RecoilRoot>
			<RouterProvider router={router} />
		</RecoilRoot>
	</StrictMode>,
);
