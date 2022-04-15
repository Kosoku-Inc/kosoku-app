import RNEncryptedStorage from 'react-native-encrypted-storage';

import { Optional } from '../../model/optional.model';

export class EncryptedStorage {
    read = async <T>(key: string): Promise<Optional<T>> => {
        const data = await RNEncryptedStorage.getItem(key);

        return data ? (JSON.parse(data) as T) : null;
    };

    write = async <T>(key: string, data: T) => {
        await RNEncryptedStorage.setItem(key, JSON.stringify(data));
    };

    delete = async (key: string) => {
        await RNEncryptedStorage.removeItem(key);
    };
}

export const encryptedStorage = new EncryptedStorage();
