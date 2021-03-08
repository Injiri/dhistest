import React from 'react'
import { shape, string } from 'prop-types'
import { InputField, Button } from '@dhis2/ui-core'
import { useCode } from './useCode'
import { Container, StyledCard, ButtonContainer } from './style'
import { setOrgUnitCode } from '../../api'

export const Main = ({ orgUnit }) => {
    const [state, dispatch, types, status] = useCode(orgUnit.code)

    const onInput = event =>
        dispatch({ type: types.INPUT, code: event.target.value })

    const onReset = () => dispatch({ type: types.RESET })

    const onSubmit = async () => {
        dispatch({ type: types.SUBMIT })
        const success = await setOrgUnitCode({ ...orgUnit, code: state.code })
        dispatch({
            type: types.UPDATE,
            status: success ? status.VALID : status.ERROR,
        })
    }

    return (
        <Container>
            <StyledCard>
                <h1>{orgUnit.name}</h1>
                <InputField
                    name="code"
                    label="Code"
                    onChange={onInput}
                    value={state.code}
                    valid={state.status === status.VALID}
                    error={state.status === status.ERROR}
                    loading={state.status === status.LOADING}
                    disabled={state.status === status.LOADING}
                />
                <ButtonContainer end>
                    <Button
                        onClick={onReset}
                        disabled={state.resetDisabled}
                        destructive
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={state.submitDisabled}
                        primary
                    >
                        Submit
                    </Button>
                </ButtonContainer>
            </StyledCard>
        </Container>
    )
}

Main.propTypes = {
    orgUnit: shape({
        name: string.isRequired,
        code: string,
    }).isRequired,
}
