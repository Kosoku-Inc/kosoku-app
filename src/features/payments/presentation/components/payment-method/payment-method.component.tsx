import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { REMOVE_PAYMENT_METHOD, SET_AS_DEFAULT_PAYMENT_METHOD } from '../../../data/store/payments.actions';
import { PaymentMethodType } from '../../../model/method-type.model';
import { PaymentMethod } from '../../../model/payment-method.model';
import { toPaymentMethodAsset, toReadablePaymentMethod } from '../../../utils/formatters.utils';

import { Name, PaymentMethodWrapper, PressableText, TextHolder, AdditionalInfo, Icon } from './payment-method.styled';

export type PaymentMethodProps = {
    method: PaymentMethod;
};

export const PaymentMethodComponent: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
    const dispatch = useDispatch();

    const handleTilePress = useCallback(() => {
        dispatch(SET_AS_DEFAULT_PAYMENT_METHOD.TRIGGER(props.method.id));
    }, [dispatch, props]);

    const handleDeletePress = useCallback(() => {
        dispatch(REMOVE_PAYMENT_METHOD.TRIGGER(props.method.id));
    }, [dispatch, props]);

    return (
        <PaymentMethodWrapper onPress={handleTilePress} isDefault={props.method.isDefault}>
            <Icon source={toPaymentMethodAsset(props.method)} />
            <TextHolder>
                <Name>{toReadablePaymentMethod(props.method)}</Name>
                {!!props.method.details && (
                    <AdditionalInfo>
                        {props.method.details.holder}
                        {'\t'}
                        {props.method.details.exp}
                    </AdditionalInfo>
                )}
            </TextHolder>
            {props.method.type !== PaymentMethodType.Cash && (
                <PressableText onPress={handleDeletePress}>Удалить</PressableText>
            )}
        </PaymentMethodWrapper>
    );
};
