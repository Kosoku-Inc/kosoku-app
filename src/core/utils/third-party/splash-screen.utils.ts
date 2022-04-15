import RNBootSplash from 'react-native-bootsplash';

export class SplashScreen {
    hide = async () => {
        await RNBootSplash.hide({ fade: true });
    };
}

export const splashScreen = new SplashScreen();
