import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from '@dhis2/ui-core'

const StyledSpan = styled.span`
    display: inline-block;
    border-radius: 3px;
    padding: 0 5px;
    line-height: 26px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    ${({ checked }) => {
        if (checked)
            return css`
                background: ${theme.secondary600};
                color: white;
            `
    }}
`

export const Label = ({ id, selected, label, onChange }) => {
    const checked = id === selected

    const onClick = () => {
        if (!checked) onChange(id)
    }

    return (
        <StyledSpan checked={checked} onClick={onClick}>
            {label}
        </StyledSpan>
    )
}
