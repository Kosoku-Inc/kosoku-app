import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getExistingUser, getIsUserLoading } from '../../../core/data/store/user.selectors';
import { Avatar } from '../../../core/presentation/avatar/avatar.styled';
import { SafeBackground } from '../../../core/presentation/background/background.styled';
import { Header } from '../../../core/presentation/header/header.component';
import { toReadableCarClass } from '../../../core/utils/formatters/car-class.utils';
import { toReadableGender } from '../../../core/utils/formatters/gender.utils';
import { mockedAvatar } from '../../../mocks/users';
import { GET_USER } from '../data/store/profile.actions';

import { Name, Title, CommonText } from './components/profile-text/profile-text.styled';
import { ProfileTileWrapper, DataWrapper } from './components/profile-tile/profile-tile.styled';

export const ProfileScreen: React.FC = () => {
    const user = useSelector(getExistingUser);
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsUserLoading);

    const getUser = useCallback(() => {
        if (user.driver) {
            // To update amount of money
            dispatch(GET_USER.TRIGGER());
        }
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    if (!user) {
        return null;
    }

    return (
        <SafeBackground edges={['top']}>
            <Header title={'Профиль'} />
            <ScrollView
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getUser} />}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Avatar source={mockedAvatar} style={{ width: 120, height: 120, borderRadius: 60 }} />
                <Name>
                    {user.firstName} {user.lastName}
                </Name>
                <ProfileTileWrapper>
                    <Title>Персональная информация</Title>
                    <DataWrapper>
                        <CommonText>Электронная почта: {user.email}</CommonText>
                        <CommonText>Телефон: {user.phone}</CommonText>
                        <CommonText>Пол: {toReadableGender(user.gender)}</CommonText>
                    </DataWrapper>
                </ProfileTileWrapper>
                {!!user.driver && (
                    <ProfileTileWrapper>
                        <Title>Водительская информация</Title>
                        <DataWrapper>
                            <CommonText>Баланс: {user.driver.balance} рублей</CommonText>
                            <CommonText>Машина: {user.driver.carBrand}</CommonText>
                            <CommonText>Класс: {toReadableCarClass(user.driver.carClass)}</CommonText>
                        </DataWrapper>
                    </ProfileTileWrapper>
                )}
            </ScrollView>
        </SafeBackground>
    );
};
