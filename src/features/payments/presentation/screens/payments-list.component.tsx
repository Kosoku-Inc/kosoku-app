import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeBackground } from '../../../../core/presentation/background/background.styled';
import { Button } from '../../../../core/presentation/button/button.component';
import { Header } from '../../../../core/presentation/header/header.component';
import { defaultTheme } from '../../../../core/utils/theme/themes.utils';
import { screens } from '../../../navigation/utils/screens';
import { GET_PAYMENT_METHODS } from '../../data/store/payments.actions';
import { getIsPaymentsListLoading, getPaymentMethodList } from '../../data/store/payments.selectors';
import { PaymentMethodComponent } from '../components/payment-method/payment-method.component';
import { width } from '../components/payment-method/payment-method.styled';

export const PaymentsList = ({ navigation }: { navigation: StackNavigationProp<never> }) => {
    const isLoading = useSelector(getIsPaymentsListLoading);
    const methods = useSelector(getPaymentMethodList) ?? [];
    const dispatch = useDispatch();

    const getPaymentsList = useCallback(() => {
        dispatch(GET_PAYMENT_METHODS.TRIGGER());
    }, [dispatch]);

    useEffect(() => {
        getPaymentsList();
        // eslint-disable-next-line
    }, []);

    const onAddCardPress = useCallback(() => {
        navigation.navigate(screens.main.payments.addCard as never);
    }, [navigation]);

    console.log(methods);

    return (
        <SafeBackground edges={['top']}>
            <Header title={'Способы оплаты'} />
            <ScrollView
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getPaymentsList} />}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {[...methods].reverse().map((method) => (
                    <PaymentMethodComponent method={method} key={method.id.toString()} />
                ))}
                <Button
                    title={'Добавить карту'}
                    onPress={onAddCardPress}
                    style={{ width: width - defaultTheme.spacer * 4 }}
                />
            </ScrollView>
        </SafeBackground>
    );
};
