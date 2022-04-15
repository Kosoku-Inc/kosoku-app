import { userReducer } from '../../../core/data/store/user.reducer';
import { historyReducer } from '../../../features/history/data/store/history.reducer';
import { homeReducer } from '../../../features/home/data/store/home.reducer';
import { paymentsReducer } from '../../../features/payments/data/store/payments.reducer';

export type ApplicationState = {
    user: ReturnType<typeof userReducer>;
    history: ReturnType<typeof historyReducer>;
    payments: ReturnType<typeof paymentsReducer>;
    home: ReturnType<typeof homeReducer>;
};
