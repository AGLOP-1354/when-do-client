import {atom} from 'recoil';

export type AccountType = {
  _id: string;
  userId: string;
  socialId?: string;
  name: string;
  email: string;
  profileImage?: string;
  description?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export const accountAtom = atom<AccountType>({
   key: 'account',
   default: {
     _id: '',
     socialId: undefined,
     userId: '',
     name: 'guest',
     email: 'XXX.when-do.io',
     profileImage: '',
     description: '',
   },
});
