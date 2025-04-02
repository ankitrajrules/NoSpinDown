import axios from "axios";
import { setInterval } from "timers/promises";

const URL = process.env.TARGET_URL || "https://tinylinks.in";
const INTERVAL = parseInt(process.env.INTERVAL || "60000"); // Default 1 minute

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

// async () => {
// 	console.log(`Starting keep-alive hit for ${URL}`);
// 	await hitEndpoint();
// };
(async () => {
	const EXECUTION_INTERVAL = 10000; // Interval between executions in milliseconds (e.g., 10 seconds)
	const MAX_EXECUTIONS = Math.floor(INTERVAL / EXECUTION_INTERVAL);

	console.log(
		`Starting keep-alive service for ${URL}, executing every ${
			EXECUTION_INTERVAL / 1000
		} seconds for a total duration of ${INTERVAL / 60000} minutes`
	);

	// Function to introduce a delay
	const delay = (ms: number | undefined) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	// Track the start time
	const startTime = Date.now();

	for (let i = 0; i < MAX_EXECUTIONS; i++) {
		// Check if the elapsed time has exceeded the maximum allowed duration
		if (Date.now() - startTime >= INTERVAL) {
			console.log("Maximum execution time reached. Stopping execution.");
			break;
		}

		await hitEndpoint(); // Execute the function
		if (i < MAX_EXECUTIONS - 1) {
			await delay(EXECUTION_INTERVAL); // Wait for the next execution
		}
	}
	// for await (const _ of setInterval(INTERVAL)) {
	// 	await hitEndpoint();
	// }
})();
