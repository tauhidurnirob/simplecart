import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    items: []
  },
  actions: {
    setStore: (newState) => ({ setState }) => {
        setState({
            items: newState
        });
    },
    setItems: (newState) => ({ setState, getState }) => {
        const { items } = getState();
        setState({
            items: [...items, newState]
        });
    },
    removeItems: (id) => ({ setState, getState }) => {
        let { items } = getState();
        items = items.filter((f)=> f.id !== id)
        setState({ items: items });
    }
  }
});

export const useItems = createHook(Store);