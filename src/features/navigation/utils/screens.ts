export const screens = {
    auth: {
        login: 'LoginScreen',
        register: 'RegisterScreen',
    },
    main: {
        home: {
            root: 'HomeNavigator',
            screen: 'Home',
        },
        payments: {
            root: 'PaymentsNavigator',
            list: 'PaymentsList',
            addCard: 'AddCard',
        },
        history: 'HistoryScreen',
        profile: 'ProfileScreen',
    },
};
