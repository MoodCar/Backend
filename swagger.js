const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Moodcar',
    description: 'Moodcar의 Express 서버 API',
  },
  host: 'http://ec2-3-39-17-18.ap-northeast-2.compute.amazonaws.com',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/google.routes.js','./routes/user.routes.js','./routes/diary.routes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);