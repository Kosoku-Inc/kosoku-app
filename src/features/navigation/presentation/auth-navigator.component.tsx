import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../../auth/presentation/screens/login.component';
import { RegisterScreen } from '../../auth/presentation/screens/register.component';
import { screens } from '../utils/screens';

export const AuthStackNavigator = createStackNavigator();

export const AuthNavigator: React.FC = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <AuthStackNavigator.Screen name={screens.auth.login} component={LoginScreen} />
            <AuthStackNavigator.Screen name={screens.auth.register} component={RegisterScreen} />
        </AuthStackNavigator.Navigator>
    );
};
