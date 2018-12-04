const rp = require('request-promise');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
    accessKeyId: `${process.env.accessKeyId}`,
    secretAccessKey: `${process.env.secretAccessKey}`
});

// Including async function keyword doesn't appear to run rp.  Why?
exports.handler = (event, context, callback) => {
    const url = `https://www.omdbapi.com/?t=${event.queryStringParameters.title}&y=&plot=short&apikey=${process.env.omdbapikey}`;
    addToDynamoDB(event.queryStringParameters.title);

    rp(url)
    .then(function(data) {
        console.log(`Making an api call to ${url}`);
        const response = {
            isBase64Encoded: false,
            statusCode: 200,
            body: data,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"
            }
        };

        callback(null, response);
    });
};


function addToDynamoDB(title){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName:"omdb_table",
        Item:{
            'name': 'Lambda Entry',
            'type' : 'HTTP',
            'title': title,
            'timestamp': String(new Date().getTime()),
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}
