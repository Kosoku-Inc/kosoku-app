import { NavigationContainerRef } from '@react-navigation/native';

export class NavigationService {
    // eslint-disable-next-line
    private _navigationRef: NavigationContainerRef<any> | null = null;

    setNavigationRef = (ref: NavigationContainerRef<never>) => (this._navigationRef = ref);

    goBack = () => {
        this._navigationRef?.goBack();
    };
}

export const navigationService = new NavigationService();
