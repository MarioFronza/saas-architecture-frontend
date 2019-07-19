import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  openMembersModal: null,
  closeMembersModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  membersOpenModal: false,
});

export const openModal = state => state.merge({ membersOpenModal: true });
export const closeModal = state => state.merge({ membersOpenModal: false });
export const getSuccess = (state, { data }) => state.merge({ data });
export const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map(member => (member.id === id ? { ...member, roles } : member)),
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBERS_MODAL]: openModal,
  [Types.CLOSE_MEMBERS_MODAL]: closeModal,
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});
