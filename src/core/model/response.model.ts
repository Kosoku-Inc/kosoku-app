import { Optional } from './optional.model';

export type Response<T> = {
    error?: Optional<Error>;
    data?: Optional<T>;
    status: number;
};

export type PromiseResponse<T> = Promise<Response<T>>;
