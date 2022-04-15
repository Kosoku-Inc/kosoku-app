import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';

export const useNavigationBlocker = (flag: boolean) => {
    const navigation = useNavigation();
    const sub = useRef<(() => void) | null>();

    useEffect(() => {
        if (flag) {
            sub.current = navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            });
        } else {
            sub.current && sub.current();
            sub.current = null;
        }

        return () => {
            sub.current && sub.current();
        };
    }, [flag, navigation]);
};
