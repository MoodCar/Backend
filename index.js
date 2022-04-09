const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Jenkins deploy test #7'));
app.listen(3000, () => console.log('Server Up and running at 3000'));