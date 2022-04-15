import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HistoryScreen } from '../../history/presentation/history.component';
import { ProfileScreen } from '../../profile/presentation/profile.component';
import { screens } from '../utils/screens';

import { HomeNavigator } from './home-navigator.component';
import { PaymentsNavigator } from './payments-navigator.component';

export const MainStackNavigator = createStackNavigator();

export const MainNavigator: React.FC = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <MainStackNavigator.Screen name={screens.main.home.root} component={HomeNavigator} />
            <MainStackNavigator.Screen name={screens.main.payments.root} component={PaymentsNavigator} />
            <MainStackNavigator.Screen name={screens.main.history} component={HistoryScreen} />
            <MainStackNavigator.Screen name={screens.main.profile} component={ProfileScreen} />
        </MainStackNavigator.Navigator>
    );
};
