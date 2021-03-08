import styled from 'styled-components'
import { ButtonStrip, Card } from '@dhis2/ui-core'

export const Container = styled.main`
    flex: 1;
`

export const StyledCard = styled(Card)`
    display: block !important;
    height: unset !important;
    width: unset !important;
    margin: 1rem;
    padding: 1rem;
`

export const ButtonContainer = styled(ButtonStrip)`
    margin-top: 1rem;
`
