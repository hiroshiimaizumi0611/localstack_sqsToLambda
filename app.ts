import { Request, Response } from "express";
import { SQS } from "@aws-sdk/client-sqs";

const sqs = new SQS({
  region: "ap-northeast-1",
});
const queueUrl = "http://sqs.ap-northeast-1.localhost.localstack.cloud:4566/000000000000/testQueue";

const express = require("express");
const app = express();

app.use(express.json());

app.post("/send", async (req: Request, res: Response) => {
  const { message } = req.body;

  const sendMessageRequest = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl,
  };

  try {
    const result = await sqs.sendMessage(sendMessageRequest);
    res.status(200).send({ messageId: result.MessageId });
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    res.status(500).send({ error: "Failed to send message" });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
