import { Platform } from 'react-native';

export enum FontType {
    regular = 'Regular',
    semibold = 'Semibold',
    bold = 'Bold',
}

export const getFontName = (type: FontType) => `SFProDisplay-${type}`;
