import express from 'express';
import dotenv from 'dotenv';

import FileRoutes from './routes/file.route';
import CategoryRoutes from './routes/category.route';

const app = express();

dotenv.config(); 

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(FileRoutes);
app.use(CategoryRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
});
