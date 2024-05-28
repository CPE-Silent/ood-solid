import express from 'express';
import tutorialRoutes from './routers/tutorial.routes';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/tutorials', tutorialRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
