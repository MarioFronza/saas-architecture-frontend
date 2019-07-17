import { createReducer, createActions } from 'reduxsauce';
import Imutable from 'seamless-immutable';

// Actions
const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
});

export const ProjectsTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = Imutable({
  data: [],
});

export const success = (state, { data }) => state.merge({ data });

// Reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
});
