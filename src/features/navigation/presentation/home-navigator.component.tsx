import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { HomeScreen } from '../../home/presentation/home.screen';
import { screens } from '../utils/screens';

import { HomeDrawer } from './components/home-drawer.component';

const HomeDrawerNavigator = createDrawerNavigator();

export const HomeNavigator: React.FC = () => {
    return (
        <HomeDrawerNavigator.Navigator
            screenOptions={{ headerShown: false, drawerType: 'front' }}
            drawerContent={HomeDrawer}
        >
            <HomeDrawerNavigator.Screen name={screens.main.home.screen} component={HomeScreen} />
        </HomeDrawerNavigator.Navigator>
    );
};
