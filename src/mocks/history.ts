import { Order } from '../features/history/model/order.model';

import { mockedHistory } from './database';
import { mockedGetCurrentUser } from './users';

export const mockedGetHistory = async (): Promise<Array<Order> | null> => {
    const currentUser = await mockedGetCurrentUser();

    if (currentUser) {
        return mockedHistory[currentUser.id] ? [...mockedHistory[currentUser.id]].reverse() : [];
    } else {
        return null;
    }
};
