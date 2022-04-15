import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { INITIALIZE } from '../../data/store/app.actions';

export const useInitialization = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(INITIALIZE());
        // eslint-disable-next-line
    }, []);
};
