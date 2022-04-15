import styled from 'styled-components/native';

import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const Name = styled.Text`
    font-family: ${getFontName(FontType.bold)};
    font-size: 18px;
    margin-vertical: ${(props) => props.theme.spacer * 2}px;
`;

export const Title = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 17px;
    padding: ${(props) => props.theme.spacer * 2}px;
`;

export const CommonText = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 15px;
`;
