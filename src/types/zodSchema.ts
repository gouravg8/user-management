import { z } from "zod";
const userSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	email: z.string().email("Invalid email address"),
	phone: z
		.string()
		.regex(/^[0-9]+$/, "Invalid phone number")
		.min(10, "Phone number must be at least 10 digits"),
	username: z.string().min(3, "Username must be at least 3 characters long"),
	address: z.object({
		street: z.string().min(3, "Street must be at least 3 characters long"),
		city: z.string().min(3, "City must be at least 3 characters long"),
	}),
	companyName: z
		.string()
		.min(3, "Company name must be at least 3 characters long")
		.optional(),
	// website is optional and if provided, it must be a valid URL

	website: z
		.string()
		.min(4, "Url must be appropriate length")
		.url("Invalid url")
		.optional(),
});

type FormDataType = z.infer<typeof userSchema>;

export type { FormDataType };
export { userSchema };
