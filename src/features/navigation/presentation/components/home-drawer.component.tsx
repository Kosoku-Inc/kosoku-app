import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getExistingUser } from '../../../../core/data/store/user.selectors';
import { Avatar } from '../../../../core/presentation/avatar/avatar.styled';
import { SafeBackground, Background } from '../../../../core/presentation/background/background.styled';
import { Spacer } from '../../../../core/presentation/spacer/spacer.styled';
import { SemiboldText } from '../../../../core/presentation/text/text.styled';
import { mockedAvatar } from '../../../../mocks/users';
import { LOGOUT } from '../../../auth/data/store/auth.actions';
import { getDefaultPaymentMethod } from '../../../payments/data/store/payments.selectors';
import { toReadablePaymentMethod } from '../../../payments/utils/formatters.utils';
import { screens } from '../../utils/screens';

import {
    HorizontalWrapper,
    TextWrapper,
    FirstName,
    LastName,
    MenuOptionWrapper,
    ProfileWrapper,
    PaymentOption,
} from './home-drawer.styled';

export const HomeDrawer = (props: DrawerContentComponentProps) => {
    const user = useSelector(getExistingUser);
    const defaultPaymentMethod = useSelector(getDefaultPaymentMethod);
    const dispatch = useDispatch();

    const handleProfilePress = useCallback(() => {
        props.navigation.navigate(screens.main.profile);
    }, [props.navigation]);

    const handlePaymentOptionsPress = useCallback(() => {
        props.navigation.navigate(screens.main.payments.root);
    }, [props.navigation]);

    const handleOrderHistoryPress = useCallback(() => {
        props.navigation.navigate(screens.main.history);
    }, [props]);

    const handleLogoutPress = useCallback(() => {
        props.navigation.closeDrawer();
        dispatch(LOGOUT.TRIGGER());
    }, [dispatch, props.navigation]);

    if (!user) {
        return null;
    }

    return (
        <SafeBackground>
            <Background>
                <ProfileWrapper onPress={handleProfilePress}>
                    <Avatar source={mockedAvatar} />
                    <TextWrapper>
                        <FirstName>{user.firstName}</FirstName>
                        <LastName>
                            {`\t`}
                            {user.lastName}
                        </LastName>
                    </TextWrapper>
                </ProfileWrapper>
                {!user.driver && !!defaultPaymentMethod && (
                    <HorizontalWrapper onPress={handlePaymentOptionsPress}>
                        <MenuOptionWrapper>
                            <SemiboldText>Способы оплаты</SemiboldText>
                            <PaymentOption>{toReadablePaymentMethod(defaultPaymentMethod)}</PaymentOption>
                        </MenuOptionWrapper>
                    </HorizontalWrapper>
                )}
                <HorizontalWrapper onPress={handleOrderHistoryPress}>
                    <MenuOptionWrapper>
                        <SemiboldText>История поездок</SemiboldText>
                    </MenuOptionWrapper>
                </HorizontalWrapper>
                <Spacer />
                <HorizontalWrapper onPress={handleLogoutPress}>
                    <MenuOptionWrapper>
                        <SemiboldText>Выход</SemiboldText>
                    </MenuOptionWrapper>
                </HorizontalWrapper>
            </Background>
        </SafeBackground>
    );
};
