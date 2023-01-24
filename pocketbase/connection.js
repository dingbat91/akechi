import PocketBase from "pocketbase";
import * as dotenv from "dotenv";

dotenv.config();

async function authPB(pb) {
	const authData = await pb
		.collection("users")
		.authWithPassword(process.env.PB_USER, process.env.PB_PWD);
	console.log(pb.authStore.isValid);
	console.log(pb.authStore.token);
	console.log(pb.authStore.model.id);
}

export function PBConnect() {
	const pb = new PocketBase(process.env.PB_URL);
	authPB(pb);
	return pb;
}
