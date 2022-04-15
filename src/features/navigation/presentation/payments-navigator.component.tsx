import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddCard } from '../../payments/presentation/screens/add-card.component';
import { PaymentsList } from '../../payments/presentation/screens/payments-list.component';
import { screens } from '../utils/screens';

export const PaymentsStackNavigator = createStackNavigator();

export const PaymentsNavigator: React.FC = () => {
    return (
        <PaymentsStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <PaymentsStackNavigator.Screen name={screens.main.payments.list} component={PaymentsList} />
            <PaymentsStackNavigator.Screen name={screens.main.payments.addCard} component={AddCard} />
        </PaymentsStackNavigator.Navigator>
    );
};
