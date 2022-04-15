import styled from 'styled-components/native';

import { defaultShadow } from '../../utils/theme/shadows.utils';

export const ToastWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer * 2}px;
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    border-radius: ${(props) => props.theme.spacer * 2}px;
    width: 90%;
    background-color: white;
    flex-direction: row;
`;

export const ToastIndicator = styled.View`
    height: 100%;
    width: ${(props) => props.theme.spacer * 4}px;
    background-color: ${(props) => props.theme.colors.error};
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    flex-direction: row-reverse;
`;

export const PseudoBackground = styled.View`
    height: 100%;
    width: ${(props) => props.theme.spacer * 2}px;
    background-color: white;
`;

export const ToastTextWrapper = styled.View`
    flex: 1;
    margin-vertical: ${(props) => props.theme.spacer * 2}px;
    justify-content: space-between;
`;

ToastWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};
