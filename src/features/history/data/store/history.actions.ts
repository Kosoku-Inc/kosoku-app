import { createAction } from '@reduxjs/toolkit';

import { Order } from '../../model/order.model';

export const FETCH_HISTORY = {
    TRIGGER: createAction('[Fetch History] Trigger'),
    STARTED: createAction('[Fetch History] Started'),
    COMPLETED: createAction<Array<Order>>('[Fetch History] Completed'),
    FAILED: createAction<Error>('[Fetch History] Failed'),
};
