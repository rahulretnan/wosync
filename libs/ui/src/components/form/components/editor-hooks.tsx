import { useCommands, useKeymap } from '@remirror/react';
import { useCallback } from 'react';
import { KeyBindingCommandFunction } from 'remirror';

export const useInsertHardBreak = () => {
  const { insertHardBreak } = useCommands();

  const handler = useCallback<KeyBindingCommandFunction>(() => {
    insertHardBreak();
    return true;
  }, []);

  useKeymap('Enter', handler); // Add the handler to the keypress pattern.
};
