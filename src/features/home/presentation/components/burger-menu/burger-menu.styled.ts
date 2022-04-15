import styled from 'styled-components/native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const burgerAsset = require('../../../../../../assets/icons/burger.png');

export const BurgerWrapper = styled.Pressable`
    position: absolute;
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const BurgerMenu = styled.Image`
    height: 30px;
    width: 30px;
`;

BurgerMenu.defaultProps = {
    resizeMode: 'contain',
};
