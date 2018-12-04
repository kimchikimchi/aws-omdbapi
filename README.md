# Serverless Movie Search

### Overview
In this activity, you'll use the existing Movie Search HTML code to build a serverless application by writing an AWS Lambda function in nodejs, API Gateway, and DynamoDB table. Your movie search code will use AJAX to trigger the AWS Lambda function, which will make an API call to the OMDB API and return the result in JSON. The event will be logged in the DynamoDB table. 
### Before You Begin  
- Make sure you have created a Free Tier AWS account.
- Sign up for the Lite (free) version of the Screencastify Chrome extension to record your  serverless AWS architecture.
  
### Submission on BCS
* Please submit the deployed AWS S3 static website public link (i.e., `https://s3.us-east-2.amazonaws.com/<yourbucketname>/index.html`) to your serverless movie search app
* Submit the link to your GitHub repo code

### Instructions

- Review the provided Movie Search HTML and embedded JavaScript code.

- Write a Nodejs function in a file named `index.js` which based on the ajax call in the movie search code, which imports the `request` and `aws-sdk` npm packages, and invokes an HTTP OMDB API GET request when the function is triggered and returns the results as a JSON object. Upload or copy/paste your code into a new AWS Lambda function. *NOTE*: Make sure your lambda response uses the following format, particularly the header field value as omitting it will result in a CORB (Cross origin resource blocking error):

```
      statusCode: 200,
      body: <OMDB Data response>
      headers: {
        "Access-Control-Allow-Origin":"*",
        "content-type": "application/json"
      }
```
[AWS Lambda Function Output formatting](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format)<br/><br/>
Make sure to include your AWS Dynamodb configuration details:

```
var request = require('request');
var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: "your access key",
  secretAccessKey: "your secret access key"
});
```
Make sure to run `npm install` locally and create a deployment .zip (i.e., `npx bestzip yourzipfilename.zip <applicable directory>`) which includes the `node_modules` folder.
- Create a new AWS API Gateway by adding an API Gateway trigger. Create an HTTP GET route which will return the results of the AWS Lambda function. Remember to pass the movie name and API key (i.e. trilogy) as a query parameter to your AWS API Gateway endpoint, otherwise the OMDB API will return an error. (i.e. `HTTP GET https://www.omdbapi.com/?t=Alien&y=&plot=short&apikey=trilogy`)

- Replace the OMDB API HTTP Ajax call within the provided Movie Search HTML with an .ajax() call to your AWS API Gateway.

- Upload your updated Movie Search code and supporting files to an AWS S3 bucket and configure it to be a public, static website (Review Unit 19.2, if needed)

- Create an AWS DynamoDB table and, if you haven't already done so, an AWS User with *AmazonDynamoDBFullAccess* permissions and save the applicable AWS Access Key ID and Access Secret. Make sure to create a composite key which allows multiple entries with the same movie title by checking "Add Sort Key" and adding the two property names.
<p align="center">
 <img src="./images/DynamoDBHWCompositeKey.png" width="90%">
 </p><br/><br/>
- Using the format below, add code to the AWS Lambda which will write/create a record to the database whenever the Lambda is triggered. Information stored should include the name of the movie searched and a timestamp for when the HTTP request was made. Review Unit 19.3 for instructions.

```
...
   Item:{
       name: 'Lambda Entry',
       type : 'HTTP',
       title: title,
       timestamp:String(new Date().getTime())
    }
...
```
- Run a few practice tests to ensure the AWS Lambda is being triggered by the HTTP GET routes in the AWS API Gateway and the.
- Finally, either using jQuery OR through the use of your own API Gateway SDK, alter the Movie Search HTML/JavaScript such that it makes an HTTP call to your HTML. Once you've edited the file, push the static website and it's values into an AWS S3. Don't forget to make your html page public!

### Reminder: Submission on BCS

* Please submit the deployed AWS S3 static website public link (i.e., `https://s3.us-east-2.amazonaws.com/<yourbucketname>/index.html`) to your serverless movie search app
* Submit the link to your GitHub repo code
- - -

### Minimum Requirements

Since most of the code is in AWS, we'd like you to use [Screencastify](https://www.screencastify.com/buy/) to record your serverless application configuration (Lambda, API Gateway, S3, DynamoDB). But all three AWS serverless products should be a part of the application
- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**