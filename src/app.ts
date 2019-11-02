import express, { Application, NextFunction, Request, Response } from 'express';

// import routes
import { appRoutes } from './routes/app.routes';

const app: Application = express();

app.use(express.json());

// app routes
app.get('/', (req, res) => {
	res.json({ status: 'success', message: 'Welcome to FullStack Test API' });
});

app.use('/api', appRoutes);

// invalid route
app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new Error('Route Not found');
	next(error);
});

// error response
app.use(
	(
		error: { message: string; status: number },
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		res.status(error.status || 500);
		res.json({
			message: error.message,
			status: 'error',
		});
		next();
	},
);

// application port
const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export const apiApp = app;
