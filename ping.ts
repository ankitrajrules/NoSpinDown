import axios from "axios";

const url = "tinylinks.in"; // Replace with your Render app URL

async function keepServerAlive() {
	try {
		const response = await axios.get(url);
		console.log(
			`Ping successful: ${response.status} at ${new Date().toISOString()}`
		);
	} catch (error) {
		console.error(`Error pinging server: ${error.message}`);
	}
}

keepServerAlive();
