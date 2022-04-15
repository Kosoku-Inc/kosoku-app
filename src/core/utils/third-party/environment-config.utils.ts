import Config from 'react-native-config';

const readableEnv = {
    stripePublishableKey: 'STRIPE_PUBLISHABLE_KEY',
    paymentGatewayAPI: 'PAYMENT_GATEWAY_API',
    dataGatewayAPI: 'DATA_GATEWAY_API',
    directionsGatewayAPI: 'DIRECTIONS_GATEWAY_API',
    connectionGatewayAPI: 'CONNECTION_GATEWAY_API',
};

export type EnvironmentConfigVars = Record<keyof typeof readableEnv, string>;

export class EnvironmentConfig {
    get = (key: keyof EnvironmentConfigVars): string => {
        return Config[readableEnv[key]];
    };
}

export const environmentConfig = new EnvironmentConfig();
