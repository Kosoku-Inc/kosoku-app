import { CardField, CardFieldInput } from '@stripe/stripe-react-native';
import React, { useCallback, useRef } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getExistingUser } from '../../../../core/data/store/user.selectors';
import { SafeBackground } from '../../../../core/presentation/background/background.styled';
import { Button } from '../../../../core/presentation/button/button.component';
import { Header } from '../../../../core/presentation/header/header.component';
import { SpacerPressable } from '../../../../core/presentation/spacer/spacer.styled';
import { useNavigationBlocker } from '../../../../core/utils/hooks/use-navigation-blocker.utils';
import { toastService } from '../../../../core/utils/services/toast-service.utils';
import { colors } from '../../../../core/utils/theme/colors.utils';
import { FontType, getFontName } from '../../../../core/utils/theme/fonts.utils';
import { defaultTheme } from '../../../../core/utils/theme/themes.utils';
import { ADD_CARD } from '../../data/store/payments.actions';
import { getIsCardAdding } from '../../data/store/payments.selectors';
import { toValidCardBrand, toValidExp } from '../../utils/formatters.utils';

export const AddCard: React.FC = () => {
    const isLoading = useSelector(getIsCardAdding);
    const dispatch = useDispatch();
    const cardData = useRef<CardFieldInput.Details>();
    const user = useSelector(getExistingUser);

    const handleAddPress = useCallback(() => {
        if (
            cardData.current?.validCVC !== CardFieldInput.ValidationState.Valid ||
            cardData.current?.validNumber !== CardFieldInput.ValidationState.Valid ||
            cardData.current?.validExpiryDate !== CardFieldInput.ValidationState.Valid
        ) {
            return;
        }

        const data = cardData.current as CardFieldInput.Details;
        const brand = toValidCardBrand(data.brand);

        if (!brand) {
            toastService.showError(new Error(`Мы не работаем с картами ${data.brand}`));
            return;
        }

        dispatch(
            ADD_CARD.TRIGGER({
                lastFour: data.last4,
                exp: toValidExp(data.expiryMonth, data.expiryYear),
                brand: brand,
                holder: `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`,
            })
        );
    }, [dispatch, user]);

    useNavigationBlocker(isLoading);

    return (
        <SafeBackground>
            <Header title={'Добавить карту'} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
                <CardField
                    style={{
                        width: Dimensions.get('window').width - defaultTheme.spacer * 4,
                        height: 100,
                        marginLeft: defaultTheme.spacer * 2,
                    }}
                    postalCodeEnabled={false}
                    cardStyle={{
                        fontFamily: getFontName(FontType.semibold),
                        textColor: colors.black,
                    }}
                    onCardChange={(data) => (cardData.current = data)}
                />
                <SpacerPressable onPress={Keyboard.dismiss} />
                <Button isLoading={isLoading} title={'Добавить'} onPress={handleAddPress} />
            </KeyboardAvoidingView>
        </SafeBackground>
    );
};
