import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '@prisma/client';

type UsersState = {
  me: User;
  setMe: (value: User) => void;
};

export const usersStore = create(
  persist<UsersState>(
    (set) => ({
      me: null,
      setMe: (value) => set(
        () => ({ me: value, })
      ),
    }),
    {
      name: 'storymake/users-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
