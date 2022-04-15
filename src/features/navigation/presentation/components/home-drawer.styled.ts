import styled from 'styled-components/native';

import { BoldText, SemiboldText, Text } from '../../../../core/presentation/text/text.styled';

export const ProfileWrapper = styled.Pressable`
    width: 100%;
    flex-direction: row;
    margin-bottom: ${(props) => props.theme.spacer * 4}px;
`;

export const HorizontalWrapper = styled.Pressable`
    width: 100%;
    flex-direction: row;
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
`;

export const TextWrapper = styled.View`
    flex: 1;
    margin: ${(props) => props.theme.spacer * 2}px;
    justify-content: space-between;
`;

export const MenuOptionWrapper = styled.View`
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
`;

export const FirstName = styled(BoldText)`
    font-size: 20px;
`;

export const LastName = styled(SemiboldText)`
    font-size: 16px;
    color: ${(props) => props.theme.colors.contrast};
    opacity: 0.5;
`;

export const PaymentOption = styled(Text)`
    font-size: 16px;
    margin-top: 2px;
    opacity: 0.5;
`;
