import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getIsUserLoading } from '../../../../core/data/store/user.selectors';
import { SafeBackground } from '../../../../core/presentation/background/background.styled';
import { Button } from '../../../../core/presentation/button/button.component';
import { TextInput } from '../../../../core/presentation/text-input/text-input.component';
import { screens } from '../../../navigation/utils/screens';
import { LOGIN } from '../../data/store/auth.actions';
import { FormHolder } from '../components/form-holder/form-holder.styled';
import { FormTitle, FormSubtitle, FormBottomSubtitle, PressableText } from '../components/form-title/form-title.styled';

export const LoginScreen: React.FC = () => {
    const email = useRef('');
    const password = useRef('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isLoading = useSelector(getIsUserLoading);

    const handleLoginPress = useCallback(() => {
        Keyboard.dismiss();
        dispatch(LOGIN.TRIGGER({ email: email.current, password: password.current }));
    }, [dispatch]);

    const handleRegisterPress = useCallback(() => {
        if (isLoading) return;
        // eslint-disable-next-line
        // @ts-ignore
        navigation.navigate(screens.auth.register);
    }, [navigation, isLoading]);

    return (
        <SafeBackground>
            <FormHolder>
                <FormTitle>Путешествуйте с Kosoku</FormTitle>
                <FormSubtitle>Войдите, чтобы начать поездку</FormSubtitle>
                <TextInput
                    keyboardType={'email-address'}
                    placeholder={'Электронная почта'}
                    onChangeText={(text) => (email.current = text)}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder={'Пароль'}
                    onChangeText={(text) => (password.current = text)}
                />
                <Button isLoading={isLoading} title={'Войти'} onPress={handleLoginPress} />
                <FormBottomSubtitle>Еще не завели аккаунт?</FormBottomSubtitle>
                <PressableText onPress={handleRegisterPress}>Зарегистрируйтесь!</PressableText>
            </FormHolder>
        </SafeBackground>
    );
};
