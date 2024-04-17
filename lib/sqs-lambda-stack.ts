import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class SqsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "queue", {
      queueName: "testQueue",
    });

    const lambdaFunction = new NodejsFunction(this, "Function", {
      entry: "handlers/index.ts",
      functionName: "handler",
      runtime: lambda.Runtime.NODEJS_18_X,
    });

    const eventSource = new lambdaEventSources.SqsEventSource(queue);
    lambdaFunction.addEventSource(eventSource);

    new cdk.CfnOutput(this, "SQSqueueURL", {
      value: queue.queueUrl,
      description: "SQS queue URL",
    });
  }
}
