import styled from 'styled-components/native';

import { defaultShadow } from '../../../../../core/utils/theme/shadows.utils';

export const PointerWrapper = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
    align-items: center;
`;

PointerWrapper.defaultProps = {
    pointerEvents: 'box-none',
};

export const IconWrapper = styled.View`
    height: 70px;
    width: 50px;
    align-items: center;
`;

IconWrapper.defaultProps = {
    style: {
        transform: [{ translateY: -15 }],
    },
};

export const Round = styled.View`
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 20px;
    border-width: 5px;
    border-color: red;
`;

Round.defaultProps = {
    style: {
        ...defaultShadow,
    },
};
