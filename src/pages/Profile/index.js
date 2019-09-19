import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut(params) {
        dispatch(signOut());
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" type="email" placeholder="E-Mail" />

                <hr />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Senha Atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova Senha"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação de Senha"
                />

                <button type="submit">Atualizar Perfil</button>
            </Form>
            <button type="button" onClick={handleSignOut}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
