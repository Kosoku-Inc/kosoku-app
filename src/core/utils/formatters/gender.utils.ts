import { Gender } from '../../model/gender.model';

export const toReadableGender = (gender: Gender): string => {
    switch (gender) {
        case Gender.Female:
            return 'женский';
        case Gender.Male:
            return 'мужской';
    }
};
