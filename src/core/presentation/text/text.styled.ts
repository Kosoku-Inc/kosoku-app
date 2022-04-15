import styled from 'styled-components/native';

import { FontType, getFontName } from '../../utils/theme/fonts.utils';

export const Text = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 14px;
`;

export const BoldText = styled.Text`
    font-family: ${getFontName(FontType.bold)};
    font-size: 16px;
`;

export const SemiboldText = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 16px;
`;
