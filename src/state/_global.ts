
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Listener<T> = () => void;

type SetState<T> = Dispatch<SetStateAction<T>>;

export function createGlobalState<T>(initialState: T) {
  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = (): T => state;

  const setState: SetState<T> = (newState) => {
    state = typeof newState === 'function'
      ? (newState as (prevState: T) => T)(state)
      : newState;
    listeners.forEach((listener) => listener());
  };

  const useGlobalState = (): [T, SetState<T>] => {
    const [_, forceUpdate] = useState({});

    useEffect(() => {
      const listener: Listener<T> = () => forceUpdate({});
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);

    return [state, setState];
  };

  return useGlobalState;
}

// Example usage:

