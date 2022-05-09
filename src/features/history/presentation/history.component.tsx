import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeBackground } from '../../../core/presentation/background/background.styled';
import { Header } from '../../../core/presentation/header/header.component';
import { FETCH_HISTORY } from '../data/store/history.actions';
import { getHistoryData, getIsHistoryLoading } from '../data/store/history.selectors';
import { Order } from '../model/order.model';

import { OrderTile } from './components/order-tile/order-tile.component';

const renderItem = (item: ListRenderItemInfo<Order>) => <OrderTile order={item.item} />;

export const HistoryScreen: React.FC = () => {
    const isLoading = useSelector(getIsHistoryLoading);
    const data = useSelector(getHistoryData) ?? [];
    const dispatch = useDispatch();

    const getHistory = useCallback(() => {
        dispatch(FETCH_HISTORY.TRIGGER());
    }, [dispatch]);

    useEffect(() => {
        getHistory();
        // eslint-disable-next-line
    }, []);

    return (
        <SafeBackground edges={['top']}>
            <Header title={'История поездок'} />
            <FlatList
                data={[...data].reverse()}
                onRefresh={getHistory}
                refreshing={isLoading}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeBackground>
    );
};
