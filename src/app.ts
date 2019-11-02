import express, { Application, Request, Response, NextFunction } from 'express';

// import routes
// import { appRoutes } from './routes/app-routes';

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: 'success', message: 'Welcome to FullStack Test API' });
  });
  

// app.use('/api', appRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new Error('Route Not found');
	next(error);
});

app.use(
	(
		error: { message: string; status: number },
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		res.status(error.status || 500);
		res.json({
			status: 'error',
			message: error.message,
		});
		next();
	}
);

const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export const apiApp = app;
