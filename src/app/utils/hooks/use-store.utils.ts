import { useEffect, useRef, useState } from 'react';
import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Optional } from '../../../core/model/optional.model';
import { appReducer } from '../../data/store/app.reducer';
import { appSaga } from '../../domain/app.saga';

export const useStore = (): Optional<Store> => {
    const [, setIsReady] = useState(false);
    const store = useRef<Store>();

    useEffect(() => {
        (async () => {
            const sagaMiddleware = createSagaMiddleware();
            store.current = createStore(appReducer, applyMiddleware(sagaMiddleware));

            sagaMiddleware.run(appSaga);

            setIsReady(true);
        })();
    }, []);

    return store.current;
};
