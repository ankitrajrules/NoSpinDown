import axios from "axios";

const url = "https://urlshortnerservice-latest.onrender.com/"; // Replace with your Render app URL

async function keepServerAlive() {
	try {
		const response = await axios.get(url);
		console.log(
			`Ping successful: ${response.status} at ${new Date().toISOString()}`
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`Error pinging server: ${error.message}`);
		} else {
			console.error("An unknown error occurred");
		}
	}
}

keepServerAlive();
