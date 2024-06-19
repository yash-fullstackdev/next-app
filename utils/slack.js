import axios from "axios";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

if (!SLACK_WEBHOOK_URL) {
  throw new Error(
    "Please define the SLACK_WEBHOOK_URL environment variable inside .env.local"
  );
}

export const sendSlackNotification = async (message) => {
  try {
    console.log("Preparing to send Slack notification with message:", message);

    const response = await axios.post(SLACK_WEBHOOK_URL, { text: message });

    console.log(
      "Slack notification sent successfully. Response data:",
      response.data
    );
  } catch (error) {
    console.error(
      "Error sending Slack notification:",
      error.response ? error.response.data : error.message
    );
  }
};
