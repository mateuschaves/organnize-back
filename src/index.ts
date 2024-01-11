import express from 'express';
import dotenv from 'dotenv';
import router from './routes/file.route';
const app = express();

dotenv.config(); 

const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
});
