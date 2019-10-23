import React from 'react';
import { useDispatch } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import faker from 'faker';

import SignIn from '~/pages/SignIn';
import { signInRequest } from '~/store/modules/auth/actions';

jest.mock('react-redux');

describe('SignIn page', () => {
    it('should be able to submit the Sign In form', async () => {
        const email = faker.internet.email();
        const password = faker.internet.password();
        const dispatch = await jest.fn();
        useDispatch.mockReturnValue(dispatch);

        const { getByTestId } = render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        fireEvent.change(getByTestId('email-input'), {
            target: { value: email },
        });
        fireEvent.change(getByTestId('password-input'), {
            target: { value: password },
        });
        fireEvent.submit(getByTestId('form'));

        await wait(() =>
            expect(dispatch).toHaveBeenCalledWith(
                signInRequest(email, password)
            )
        );
    });
});
