import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Toast } from '../../core/presentation/toast/toast.component';
import { defaultTheme } from '../../core/utils/theme/themes.utils';
import { useStore } from '../utils/hooks/use-store.utils';

import { NavigationEntry } from './navigation-entry.component';

export const App: React.FC = () => {
    const store = useStore();

    return store ? (
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <NavigationEntry />
                <Toast />
            </ThemeProvider>
        </Provider>
    ) : null;
};
