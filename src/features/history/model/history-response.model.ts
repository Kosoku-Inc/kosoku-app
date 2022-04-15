import { Response } from '../../../core/model/response.model';

import { Order } from './order.model';

export type HistoryResponse = Response<Array<Order>>;
