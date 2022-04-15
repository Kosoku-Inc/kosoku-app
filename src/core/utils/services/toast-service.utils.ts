import Toast from 'react-native-toast-message';

export class ToastService {
    showError = (error: Error) => {
        Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: error.message,
            autoHide: true,
            position: 'top',
        });
    };
}

export const toastService = new ToastService();
