import React from 'react';
import RNToast from 'react-native-toast-message';
import { ToastConfigParams } from 'react-native-toast-message/lib/src/types';

import { Text, BoldText } from '../text/text.styled';

import { ToastIndicator, ToastWrapper, ToastTextWrapper, PseudoBackground } from './toast.styled';

const ErrorToast = (props: ToastConfigParams<unknown>) => {
    return (
        <ToastWrapper>
            <ToastIndicator>
                <PseudoBackground />
            </ToastIndicator>
            <ToastTextWrapper>
                <BoldText>{props.text1}</BoldText>
                <Text>{props.text2}</Text>
            </ToastTextWrapper>
        </ToastWrapper>
    );
};

const SuccessToast = (props: ToastConfigParams<unknown>) => {
    return (
        <ToastWrapper>
            {/* eslint-disable-next-line react-native/no-color-literals */}
            <ToastIndicator style={{ backgroundColor: 'green' }}>
                <PseudoBackground />
            </ToastIndicator>
            <ToastTextWrapper>
                <BoldText>{props.text1}</BoldText>
                <Text>{props.text2}</Text>
            </ToastTextWrapper>
        </ToastWrapper>
    );
};

const config = {
    error: ErrorToast,
    success: SuccessToast,
};

export const Toast: React.FC = () => {
    return <RNToast config={config} />;
};
