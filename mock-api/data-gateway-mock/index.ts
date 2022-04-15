import bodyParser from 'body-parser';
import env from 'dotenv';
import express from 'express';

env.config({ path: '../../.env' });

const app = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

app.listen(4444, (): void => console.log(`Node server listening on port ${4444}!`));
