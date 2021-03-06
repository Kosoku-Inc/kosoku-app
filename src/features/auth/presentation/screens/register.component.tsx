import React, { useCallback, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getIsUserLoading } from '../../../../core/data/store/user.selectors';
import { CarClass } from '../../../../core/model/car-class.model';
import { Gender } from '../../../../core/model/gender.model';
import { SafeBackground } from '../../../../core/presentation/background/background.styled';
import { Button } from '../../../../core/presentation/button/button.component';
import { Header } from '../../../../core/presentation/header/header.component';
import { DefaultCard } from '../../../../core/presentation/horizontal-picker/default-card.component';
import { HorizontalPicker } from '../../../../core/presentation/horizontal-picker/horizontal-picker.component';
import { TextInput } from '../../../../core/presentation/text-input/text-input.component';
import { toastService } from '../../../../core/utils/services/toast-service.utils';
import { defaultTheme } from '../../../../core/utils/theme/themes.utils';
import { REGISTER } from '../../data/store/auth.actions';
import { FormHolder } from '../components/form-holder/form-holder.styled';
import {
    FormSubtitle,
    FormTitle,
    PressableText,
    PressableTextWrapper,
} from '../components/form-title/form-title.styled';
import { HorizontalPaging, Page, PagingWrapper, width } from '../components/horizontal-paging/horizontal-paging.styled';

export const RegisterScreen: React.FC = () => {
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const [isDriver, setIsDriver] = useState<boolean | null>(null);
    const phone = useRef('');
    const gender = useRef<Gender | null>(null);

    const carModel = useRef('');
    const carClass = useRef<CarClass | null>(null);

    const scroll = useRef<ScrollView | null>();
    const currentPage = useRef(0);
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsUserLoading);

    const handleContinue = useCallback(() => {
        Keyboard.dismiss();

        if (currentPage.current === 0) {
            if (!firstName.current.length || !lastName.current.length) {
                toastService.showError(new Error('?????????????????? ?????? ????????'));
                return;
            }
        }

        if (currentPage.current === 1) {
            if (!email.current.length || !password.current.length) {
                toastService.showError(new Error('?????????????????? ?????? ????????'));
                return;
            }
        }

        if (currentPage.current === 2) {
            if (isDriver === null) {
                toastService.showError(new Error('???????????????? ?????? ????????????????'));
                return;
            }
        }

        if (currentPage.current === 3) {
            if (!gender.current || !phone.current.length) {
                toastService.showError(new Error('???????????????????????? ?????????????????????? ????????????'));
                return;
            }

            if (!isDriver) {
                dispatch(
                    REGISTER.TRIGGER({
                        email: email.current,
                        password: password.current,
                        phone: phone.current,
                        firstName: firstName.current,
                        lastName: lastName.current,
                        gender: gender.current,
                    })
                );

                return;
            }
        }

        if (currentPage.current === 4) {
            if (!carModel.current.length || !carClass.current) {
                toastService.showError(new Error('???????????????????????? ?????????????????????? ????????????'));
                return;
            }

            dispatch(
                REGISTER.TRIGGER({
                    email: email.current,
                    password: password.current,
                    phone: phone.current,
                    firstName: firstName.current,
                    lastName: lastName.current,
                    gender: gender.current as Gender,
                    driver: {
                        carBrand: carModel.current,
                        carClass: carClass.current,
                        balance: 0,
                    },
                })
            );

            return;
        }

        currentPage.current += 1;

        scroll.current?.scrollTo({
            x: width * currentPage.current,
            y: 0,
            animated: true,
        });
    }, [dispatch, isDriver]);

    const handleGoBack = useCallback(() => {
        if (currentPage.current == 0 || isLoading) return;

        currentPage.current -= 1;

        scroll.current?.scrollTo({
            x: width * currentPage.current,
            y: 0,
            animated: true,
        });
    }, [isLoading]);

    return (
        <SafeBackground>
            <Header disabled={isLoading} title={''} />
            <FormHolder>
                <FormTitle>??????????????????????</FormTitle>
                <FormSubtitle>?????????????? ?????????????????????? ????????????</FormSubtitle>
                <PagingWrapper>
                    <HorizontalPaging ref={(ref) => (scroll.current = ref)}>
                        <Page>
                            <TextInput placeholder={'??????'} onChangeText={(text) => (firstName.current = text)} />
                            <TextInput placeholder={'??????????????'} onChangeText={(text) => (lastName.current = text)} />
                        </Page>
                        <Page>
                            <TextInput
                                placeholder={'?????????????????????? ??????????'}
                                keyboardType={'email-address'}
                                onChangeText={(text) => (email.current = text)}
                            />
                            <TextInput
                                secureTextEntry={true}
                                placeholder={'????????????'}
                                onChangeText={(text) => (password.current = text)}
                            />
                        </Page>
                        <Page>
                            <HorizontalPicker
                                content={roleRenderList}
                                onSelectionChange={(index) => setIsDriver(index === 1)}
                            />
                        </Page>
                        <Page>
                            <TextInput
                                keyboardType={'phone-pad'}
                                placeholder={'?????????? ????????????????'}
                                onChangeText={(text) => (phone.current = text)}
                            />
                            <HorizontalPicker
                                content={genderRenderList}
                                onSelectionChange={(index) => (gender.current = index ? Gender.Female : Gender.Male)}
                            />
                        </Page>
                        {isDriver && (
                            <Page>
                                <TextInput
                                    placeholder={'???????????? ????????????'}
                                    onChangeText={(text) => (carModel.current = text)}
                                />
                                <HorizontalPicker
                                    content={carClassRenderList}
                                    onSelectionChange={(index) =>
                                        (carClass.current = index
                                            ? index == 2
                                                ? CarClass.Business
                                                : CarClass.Economy
                                            : CarClass.Economy)
                                    }
                                />
                            </Page>
                        )}
                    </HorizontalPaging>
                </PagingWrapper>
                <Button title={'????????????????????'} onPress={handleContinue} isLoading={isLoading} />
                <PressableTextWrapper>
                    <PressableText style={{ marginLeft: 0 }} onPress={handleGoBack}>
                        ??????????
                    </PressableText>
                </PressableTextWrapper>
            </FormHolder>
        </SafeBackground>
    );
};

const splitWidth = (width - defaultTheme.spacer * 11) / 2;
const splitWidthThree = (width - defaultTheme.spacer * 14) / 3;

const roleRenderList = [
    <DefaultCard
        title={'????????????'}
        key={'????????????'}
        asset={require('../../../../../assets/icons/client.png')}
        style={{ minWidth: splitWidth }}
    />,
    <DefaultCard
        title={'????????????????'}
        key={'????????????????'}
        asset={require('../../../../../assets/icons/driver.png')}
        style={{ minWidth: splitWidth }}
    />,
];

const genderRenderList = [
    <DefaultCard title={'??????????????'} key={'??????????????'} style={{ minWidth: splitWidth }} />,
    <DefaultCard title={'??????????????'} key={'??????????????'} style={{ minWidth: splitWidth }} />,
];

const carClassRenderList = [
    <DefaultCard title={'????????????'} key={'????????????'} style={{ minWidth: splitWidthThree }} />,
    <DefaultCard title={'??????????????'} key={'??????????????'} style={{ minWidth: splitWidthThree }} />,
    <DefaultCard title={'????????????'} key={'????????????'} style={{ minWidth: splitWidthThree }} />,
];
