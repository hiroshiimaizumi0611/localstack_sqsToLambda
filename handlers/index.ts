import { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const message of event.Records) {
    await processMessageAsync(message);
  }
  console.info("done");
};

async function processMessageAsync(message: SQSRecord) {
  try {
    console.log(`Processed message ${message.body}`);
  } catch (err) {
    console.error("An error occurred");
    throw err;
  }
}
