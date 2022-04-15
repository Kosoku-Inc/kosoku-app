import { CarClass } from '../core/model/car-class.model';
import { Gender } from '../core/model/gender.model';
import { Tokens } from '../core/model/tokens.model';
import { User } from '../core/model/user.model';
import { LoginPayload } from '../features/auth/data/store/auth.actions';
import { Order } from '../features/history/model/order.model';

export const mockedUsers: Array<User & LoginPayload> = [
    {
        id: 1,
        email: 'test@test.com',
        password: '123',
        phone: '+375297439850',
        firstName: 'Vadzim',
        lastName: 'Filipovich',
        gender: Gender.Male,
    },
    {
        id: 2,
        email: 'data@data.com',
        password: '123',
        phone: '+375291111111',
        firstName: 'Data',
        lastName: 'Data',
        gender: Gender.Male,
    },
    {
        id: 3,
        email: 'meh@meh.com',
        password: '123',
        phone: '+375292222222',
        firstName: 'Meh',
        lastName: 'Meh',
        gender: Gender.Male,
        driver: {
            carBrand: 'Renault Logan',
            carClass: CarClass.Economy,
            balance: 12.24,
        },
    },
    {
        id: 4,
        email: 'yep@yep.com',
        password: '123',
        phone: '+375293333333',
        firstName: 'Yep',
        lastName: 'Yep',
        gender: Gender.Female,
        driver: {
            carBrand: 'Audi A4',
            carClass: CarClass.Comfort,
            balance: 0.0,
        },
    },
    {
        id: 5,
        email: 'huh@huh.com',
        password: '123',
        phone: '+375294444444',
        firstName: 'Huh',
        lastName: 'Huh',
        gender: Gender.Female,
        driver: {
            carBrand: 'BMW 5er',
            carClass: CarClass.Business,
            balance: 124.52,
        },
    },
];

export const mockedTokens: Record<number, Tokens> = {};

const drivers = mockedUsers.filter((user) => !!user.driver);

export const mockedHistory: Record<number, Array<Order>> = {
    1: [
        {
            id: 1,
            from: 'Test St. 1',
            to: 'Test St. 2',
            startTime: Date.now() - 119999,
            endTime: Date.now() - 19999,
            driver: drivers[0],
        },
        {
            id: 2,
            from: 'Test St. 2',
            to: 'Test St. 3',
            startTime: Date.now() - 19999,
            endTime: Date.now() - 9999,
            driver: drivers[1],
        },
        {
            id: 3,
            from: 'Test St. 3',
            to: 'Test St. 1',
            startTime: Date.now() - 9999,
            endTime: Date.now(),
            driver: drivers[2],
        },
    ],
};
