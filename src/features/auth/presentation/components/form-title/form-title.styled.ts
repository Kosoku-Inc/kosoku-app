import styled from 'styled-components/native';

import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const FormTitle = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 28px;
    color: ${(props) => props.theme.colors.contrast};
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
`;

export const FormSubtitle = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 14px;
    color: ${(props) => props.theme.colors.contrast};
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    opacity: 0.5;
`;

export const FormBottomSubtitle = styled.Text`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 4}px;
    font-family: ${getFontName(FontType.regular)};
    opacity: 0.5;
    font-size: 14px;
`;

export const PressableText = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    color: ${(props) => props.theme.colors.error};
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer}px;
    font-size: 16px;
`;

export const PressableTextWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer}px;
    margin-bottom: 50px;
    align-items: center;
`;
