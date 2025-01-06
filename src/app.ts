import express, {Application, NextFunction, Request, Response} from 'express';
import studentRouter from "./routes/studentRouter";

const app: Application = express();
const PORT = 8080;

app.use(express.json()); //-> or ./utils/parseBody.ts

app.use('', studentRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({error: err.message});
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
