import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const projectName = 'ideas-api';
const stage = 'prod';
const ideasTable = projectName + '-ideas-' + stage;
const authorsTable = projectName + '-authors-' + stage;
const commentsTable = projectName + '-comments-' + stage;

export function getIdeas () {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: ideasTable,
            AttributesToGet: [
                'id',
                'title',
                'author',
                'description'
            ]
        };

        docClient.scan(params, (err, data) => {
            if (err) return reject(err);
            return resolve(data["Items"]);
        });

    });
}

export function createIdea(idea) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: ideasTable,
            Item: idea
        };

        docClient.put(params, (err, data) => {
            if (err) return reject(err);
            return resolve(idea);
        });

    });
}

export function getAuthor(id) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: authorsTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'name'
      ]
    };

    docClient.get(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

export function getAuthors() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: authorsTable,
      AttributesToGet: [
        'id',
        'name'
      ]
    };

    docClient.scan(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

export function getComments() {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: commentsTable,
      AttributesToGet: [
        'id',
        'content',
        'author'
      ]
    };

    docClient.scan(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}
