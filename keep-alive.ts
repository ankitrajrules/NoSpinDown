import axios from "axios";
//import { setInterval } from "timers/promises";

const URL = process.env.TARGET_URL || "https://your-api-endpoint.com/health";
//const INTERVAL = parseInt(process.env.INTERVAL || "60000"); // Default 1 minute

async function hitEndpoint() {
	try {
		const response = await axios.get(URL);
		console.log(`[${new Date().toISOString()}] Success:`, response.status);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`[${new Date().toISOString()}] Error:`, error.message);
		} else {
			console.error(`[${new Date().toISOString()}] Unknown error occurred.`);
		}
	}
}

async () => {
	console.log(`Starting keep-alive hit for ${URL}`);
	await hitEndpoint();
};
// (async () => {
// 	console.log(
// 		`Starting keep-alive service for ${URL} every ${INTERVAL / 1000} seconds`
// 	);
// 	for await (const _ of setInterval(INTERVAL)) {
// 		await hitEndpoint();
// 	}
// })();
