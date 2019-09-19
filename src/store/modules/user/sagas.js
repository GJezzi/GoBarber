import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.data;

        const profile = Object.assign(
            { name, email, avatar_id },
            rest.oldPassword ? rest : {}
        );

        const response = yield call(api.put, 'users', profile);

        yield put(updateProfileSuccess(response.data));

        toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
        yield put(updateProfileFailure());
        toast.error(
            'Não foi possível atualizar perfil, favor verificar os dados.'
        );
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
