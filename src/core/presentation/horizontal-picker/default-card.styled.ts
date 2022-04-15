import styled from 'styled-components/native';

import { FontType, getFontName } from '../../utils/theme/fonts.utils';

export const DefaultCardWrapper = styled.View`
    height: 100%;
    padding: ${(props) => props.theme.spacer * 2}px;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.Image`
    height: 60px;
    border-radius: 100px;
    width: 60px;
`;

Icon.defaultProps = {
    resizeMode: 'contain',
};

export const Title = styled.Text<{ enableMargins?: boolean }>`
    font-family: ${getFontName(FontType.semibold)};
    margin-top: ${(props) => (props.enableMargins ? props.theme.spacer : 0)}px;
`;
