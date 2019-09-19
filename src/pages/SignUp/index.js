import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    email: Yup.string()
        .email('Insira um E-Mail válido.')
        .required('O E-Mail é obrigatório'),
    password: Yup.string()
        .min(6, 'No mínimo 6 caracteres.')
        .required('A Senha é obrigatória.'),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={logo} alt="GoBarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" type="email" placeholder="E-Mail" />
                <Input name="password" type="password" placeholder="Senha" />

                <button type="submit">Criar Conta</button>
                <Link to="/">Já tenho conta</Link>
            </Form>
        </>
    );
}
