import { DefaultTheme } from 'styled-components';

import { colors } from './colors.utils';

export const defaultTheme: DefaultTheme = {
    spacer: 8,
    colors: {
        background: colors.backgroundGrey,
        contrast: colors.black,
        error: colors.red,
        text: colors.darkerGrey,
    },
};
