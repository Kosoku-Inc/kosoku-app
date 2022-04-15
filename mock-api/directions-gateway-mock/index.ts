import { Client, Language } from '@googlemaps/google-maps-services-js';
import axios from 'axios';
import bodyParser from 'body-parser';
import env from 'dotenv';
import express from 'express';

import { ExtendedLocation, Location } from '../../src/features/home/model/location.model';

env.config({ path: '../../.env' });

const mapsKey = process.env.DIRECTIONS_GATEWAY_API_KEY || '';
const mockGeocoding = process.env.MOCK_GEOCODING?.toLowerCase() === 'true' || !process.env.MOCK_GEOCODING;
const mockDirections = process.env.MOCK_DIRECTIONS?.toLowerCase() === 'true' || !process.env.MOCK_GEOCODING;

const app = express();
const client = new Client({ axiosInstance: axios.create() });

app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

app.post('/decode', async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
    const { location } = req.body as unknown as { location: Location };

    if (mockGeocoding) {
        return res.send({
            latitude: location.latitude,
            longitude: location.longitude,
            readableLocation: `Заглушка #${(Math.random() * 100).toFixed()} для экономии ;p`,
        } as ExtendedLocation);
    } else {
        const decoded = await client.reverseGeocode({
            params: {
                key: mapsKey,
                latlng: location,
                language: Language.ru,
            },
        });

        console.log(JSON.stringify(decoded.data));

        return res.send({
            latitude: location.latitude,
            longitude: location.longitude,
            readableLocation: decoded.data?.results[0]?.address_components[0]?.short_name ?? 'Неизвестно',
        } as ExtendedLocation);
    }
});

app.listen(4343, (): void => console.log(`Node server listening on port ${4343}!`));
