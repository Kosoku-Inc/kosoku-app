import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        spacer: number;
        colors: {
            background: string;
            contrast: string;
            error: string;
            text: string;
        };
    }
}
