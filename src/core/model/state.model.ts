import { Optional } from './optional.model';

export type State<T> = {
    isLoading: boolean;
    error: Optional<Error>;
    data: Optional<T>;
};
