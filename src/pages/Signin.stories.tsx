import { SignIn } from "../pages/Signin";
import {Meta, StoryObj} from '@storybook/react'
import { within, userEvent, waitFor} from '@storybook/testing-library'
import {rest} from 'msw'
import {expect} from '@storybook/jest'

export default {
    title: 'Pages/SignIn',
    component: SignIn,
    args: {
    },
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post("/sessions", (req, res, ctx) => {
                    return res(ctx.json({
                        message: "Login Realizado!"
                    }))
                })
            ]
        }
    }
} as Meta

export const Default : StoryObj = {
    // play é onde vamos executar nossos testes automatizados.
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'teste2@teste2.com')
        userEvent.type(canvas.getByPlaceholderText('********'), '123123')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getByText('Login Realizado!')).toBeInTheDocument()
        })

    }
}