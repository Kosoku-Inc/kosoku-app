import { LogBox } from 'react-native';

const warningPatterns = [
    '[react-native-gesture-handler] Seems like',
    'RCTBridge required dispatch_sync to load',
    'will be removed from React Native.',
    'Sending `onAnimatedValueUpdate`',
];

export class Logger {
    configure = () => {
        LogBox.ignoreLogs(warningPatterns);

        const _console = global.console;

        global.console = {
            ..._console,
            // eslint-disable-next-line
            warn: (...data: any[]) => {
                if (typeof data[0] === 'string') {
                    const warnStr = data[0];

                    const match = warningPatterns.find((pattern) => warnStr.includes(pattern));

                    if (match) {
                        return;
                    }
                }

                _console.warn(data);
            },
        };
    };

    log = console.log;
}

export const logger = new Logger();
