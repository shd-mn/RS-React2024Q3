import { mockPerson } from '../../__test__/mocks/mockData';
import reducer, { setSearch, selectPeople, unselectPeople, MainState } from '../../redux/features/mainSlice';

describe('mainSlice', () => {
  let initialState: MainState;

  beforeEach(() => {
    initialState = {
      name: '',
      selectedPeople: [],
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ name: '', selectedPeople: [] });
  });

  it('should update the name in the state when setSearch action is dispatched', () => {
    expect(reducer(initialState, setSearch('Luke'))).toEqual({ name: 'Luke', selectedPeople: [] });
  });

  it('should add the person when selectPeople action is dispatched with isSelected:false', () => {
    expect(reducer(initialState, selectPeople({ person: mockPerson, isSelected: false }))).toEqual({
      name: '',
      selectedPeople: [mockPerson],
    });
  });

  it('should remove the person when selectPeople action is dispatched with isSelected: true', () => {
    expect(reducer(initialState, selectPeople({ person: mockPerson, isSelected: true }))).toEqual({
      name: '',
      selectedPeople: [],
    });
  });

  it('should reset the selectedPeople when unselectPeople action is dispatched', () => {
    expect(reducer(initialState, unselectPeople())).toEqual({
      name: '',
      selectedPeople: [],
    });
  });
});
