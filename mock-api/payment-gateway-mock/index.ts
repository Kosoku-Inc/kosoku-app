import bodyParser from 'body-parser';
import env from 'dotenv';
import express from 'express';
import Stripe from 'stripe';

import { CardBrand } from '../../src/features/payments/model/brand.model';
import { CreatePaymentIntentInput } from '../../src/features/payments/model/create-payment-intent-input.model';
import { PaymentMethodType } from '../../src/features/payments/model/method-type.model';
import { PaymentFinishedInput } from '../../src/features/payments/model/payment-finished.model';

import { mockedPaymentMethods, mockedPayments } from './database';

env.config({ path: '../../.env' });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

const app = express();
const stripe = new Stripe(stripeSecretKey as string, {
    apiVersion: '2020-08-27',
    typescript: true,
});

const runtimeCustomers: Record<string, string> = {};

app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

const toUsd = (byn: number) => byn / 3;

app.get('/methods', async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
    const { userId } = req.query as unknown as { userId: number };

    return res.send([...mockedPaymentMethods[userId]]);
});

app.post('/add-card', async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
    const {
        stripePaymentId,
        lastFour,
        holder,
        exp,
        brand,
        userId,
    }: {
        stripePaymentId: string;
        lastFour: string;
        holder: string;
        exp: string;
        brand: CardBrand;
        userId: number;
    } = req.body;

    const methods = mockedPaymentMethods[userId] ?? [];

    methods.push({
        id: methods.length + 1,
        type: PaymentMethodType.Card,
        isDefault: false,
        details: {
            lastFour,
            holder,
            exp,
            brand,
            stripePaymentId,
        },
    });

    mockedPaymentMethods[userId] = methods;

    return res.send({
        status: 200,
    });
});

app.post('/remove-method', async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
    const {
        methodId,
        userId,
    }: {
        methodId: number;
        userId: number;
    } = req.body;

    const method = mockedPaymentMethods[userId].find((i) => i.id === methodId);

    if (method?.isDefault) {
        // eslint-disable-next-line
        mockedPaymentMethods[userId][0] = {
            ...mockedPaymentMethods[userId][0],
            isDefault: true,
        };
    }

    mockedPaymentMethods[userId] = mockedPaymentMethods[userId].filter(
        (i) => i.id !== methodId || i.type === PaymentMethodType.Cash
    );

    return res.send({
        status: 200,
    });
});

app.post(
    '/set-default-method',
    async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
        const {
            methodId,
            userId,
        }: {
            methodId: number;
            userId: number;
        } = req.body;

        mockedPaymentMethods[userId] = mockedPaymentMethods[userId].map((method) => ({
            ...method,
            isDefault: method.id === methodId,
        }));

        return res.send({
            status: 200,
        });
    }
);

app.post('/pay', async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
    const data: PaymentFinishedInput & { userId: number } = req.body;

    const list = mockedPayments[data.userId] ? [...mockedPayments[data.userId]] : [];

    list.push({
        ...data,
        id: list.length,
    });

    mockedPayments[data.userId] = list;

    console.log(mockedPayments);

    return res.send({
        status: 200,
    });
});

app.post(
    '/create-payment-intent',
    async (req: express.Request, res: express.Response): Promise<express.Response<unknown>> => {
        const { bynAmount, requestThreeDSecure, email }: CreatePaymentIntentInput = req.body;

        const customer = runtimeCustomers[email]
            ? { id: runtimeCustomers[email] }
            : await stripe.customers.create({ email });

        runtimeCustomers[email] = customer.id;

        const params: Stripe.PaymentIntentCreateParams = {
            amount: toUsd(bynAmount),
            currency: 'usd',
            customer: customer.id,
            payment_method_options: {
                card: {
                    request_three_d_secure: requestThreeDSecure || 'automatic',
                },
            },
            payment_method_types: ['card'],
        };

        try {
            const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

            return res.send({
                clientSecret: paymentIntent.client_secret,
            });
            // eslint-disable-next-line
        } catch (error: any) {
            return res.send({
                error: error.raw.message,
            });
        }
    }
);

app.listen(4242, (): void => console.log(`Node server listening on port ${4242}!`));
