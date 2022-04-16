import Toast from 'react-native-toast-message';

export class ToastService {
    showError = (error?: Error, title?: string, message?: string) => {
        Toast.show({
            type: 'error',
            text1: title ?? 'Ошибка',
            text2: message ?? error?.message ?? '',
            autoHide: true,
            position: 'top',
        });
    };

    showSuccess = (title: string, message: string) => {
        Toast.show({
            type: 'success',
            text1: title,
            text2: message,
            autoHide: true,
            position: 'top',
        });
    };
}

export const toastService = new ToastService();
