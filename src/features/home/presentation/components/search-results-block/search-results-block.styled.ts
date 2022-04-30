import styled from 'styled-components/native';

import { colors } from '../../../../../core/utils/theme/colors.utils';
import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';

export const SearchResultWrapper = styled.Pressable`
    border-radius: 10px;
    background-color: ${colors.white};
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    margin-vertical: ${(props) => props.theme.spacer}px;
    padding: ${(props) => props.theme.spacer * 3}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Readable = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    max-width: 80%;
`;

SearchResultWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};
