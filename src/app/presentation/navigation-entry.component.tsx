import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { navigationService } from '../../core/utils/services/navigation-service.utils';
import { getIsAuthenticated } from '../../features/auth/data/store/auth.selectros';
import { AuthNavigator } from '../../features/navigation/presentation/auth-navigator.component';
import { MainNavigator } from '../../features/navigation/presentation/main-navigator.component';
import { useInitialization } from '../utils/hooks/use-initialization.utils';

const EntryStack = createStackNavigator();

export const NavigationEntry: React.FC = () => {
    const isAuthorized = useSelector(getIsAuthenticated);

    useInitialization();

    return (
        <NavigationContainer ref={navigationService.setNavigationRef}>
            <EntryStack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthorized ? (
                    <EntryStack.Screen name={'EntryMain'} component={MainNavigator} />
                ) : (
                    <EntryStack.Screen name={'EntryAuth'} component={AuthNavigator} />
                )}
            </EntryStack.Navigator>
        </NavigationContainer>
    );
};
