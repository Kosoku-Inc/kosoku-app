import { createAction } from '@reduxjs/toolkit';

import { User } from '../../../../core/model/user.model';

export const GET_USER = {
    TRIGGER: createAction('[Get User] Trigger'),
    STARTED: createAction('[Get User] Started'),
    COMPLETED: createAction<User>('[Get User] Completed'),
    FAILED: createAction<Error>('[Get User] Failed'),
};
