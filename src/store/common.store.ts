import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CommonState = {
  word: string;
};

export const commonStore = createStore(
  persist<CommonState>(
    () => ({
      word: 'JavaScript',
    }),
    {
      name: '',
    // skipHydration: true,
    // storage: createJSONStorage(() => localStorage),
    }
  )
);

export function setWord(word: string) {
  commonStore.setState({
    word,
  });
}
