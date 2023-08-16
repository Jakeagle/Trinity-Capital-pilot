import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app.html');
});
