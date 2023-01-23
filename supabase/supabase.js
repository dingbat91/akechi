import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

async function SBAuth(client) {
	let { data, error } = await client.auth.signInWithPassword({
		email: process.env.SUPABASE_EMAIL,
		password: process.env.SUPABASE_PASSWORD,
	});
}

function SBClient() {
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_KEY
	);

	return supabase;
}

export default async function SBLogin() {
	const client = SBClient();
	//SBAuth(client);
	return client;
}
