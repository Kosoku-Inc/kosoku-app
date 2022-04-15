import { Optional } from '../../../core/model/optional.model';
import { User } from '../../../core/model/user.model';

export type Order = {
    id: number;
    from: string;
    to: string;
    startTime: number;
    endTime: number;
    driver: Optional<User>;
};
