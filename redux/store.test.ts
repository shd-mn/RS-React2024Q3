import { makeStore } from '../redux/store';
import { swapiApi } from '../redux/services/swapiApi';

describe('Redux Store', () => {
  it('should configure the store with correct initial state', () => {
    const store = makeStore();

    const state = store.getState();
    expect(state.main).toBeDefined();
    expect(state.page).toBeDefined();
    expect(state[swapiApi.reducerPath]).toBeDefined();
  });

  it('should update the state when setCurrentPage action is dispatched', () => {
    const store = makeStore();
    store.dispatch({ type: 'page/setCurrentPage', payload: 5 });
    expect(store.getState().page.currentPage).toBe(5);
  });

  it('should correctly handle an API request with swapiApi', async () => {
    const store = makeStore();
    await store.dispatch(swapiApi.endpoints.getCharacter.initiate({ id: '1' }));

    const apiState = store.getState()[swapiApi.reducerPath];
    expect(apiState.queries).toBeDefined();
    expect(apiState.queries['getCharacter({"id":"1"})']).toBeDefined();
  });
});
