import styled from 'styled-components/native';

import { colors } from '../../../../../core/utils/theme/colors.utils';
import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';
import { FontType, getFontName } from '../../../../../core/utils/theme/fonts.utils';

export const UserCardWrapper = styled.View`
    flex: 1;
    margin-horizontal: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
    background-color: ${colors.white};
    border-radius: ${(props) => props.theme.spacer * 2}px;
    flex-direction: row;
    align-items: center;
    padding: ${(props) => props.theme.spacer * 2}px;
`;

export const TextInfoWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

export const Name = styled.Text`
    font-family: ${getFontName(FontType.semibold)};
    font-size: 18px;
`;

export const PersonalData = styled.Text`
    font-family: ${getFontName(FontType.regular)};
    font-size: 14px;
    margin-top: 4px;
`;

UserCardWrapper.defaultProps = {
    style: {
        ...defaultShadow,
    },
};
