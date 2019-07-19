import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Membro Atualizado',
        message: 'O membro foi atualizado com sucesso',
        options: {
          timeOut: 3000,
          progressBar: true,
        },
      }),
    );
  } catch (e) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente',
        options: {
          timeOut: 3000,
          progressBar: true,
        },
      }),
    );
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Email Enviado',
        message: 'Email enviado com sucesso',
        options: {
          timeOut: 3000,
          progressBar: true,
        },
      }),
    );
  } catch (e) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente',
        options: {
          timeOut: 3000,
          progressBar: true,
        },
      }),
    );
  }
}
