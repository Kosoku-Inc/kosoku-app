import { State } from '../../../../core/model/state.model';
import { Order } from '../../model/order.model';

export type HistoryState = State<Array<Order>>;
