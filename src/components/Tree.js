import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Node, CircularLoader } from '@dhis2/ui-core'
import { getOrgUnitTree } from '../api'
import { Label } from './Label'

const CenteredLoader = styled(CircularLoader)`
    margin-left: auto !important;
    margin-right: auto !important;
`

const Element = ({
    id,
    displayName,
    children,
    selected,
    onChange,
    initialOpen,
}) => {
    const [open, setOpen] = useState(!!initialOpen)

    const toggle = () => setOpen(!open)

    return (
        <Node
            open={open}
            onOpen={toggle}
            onClose={toggle}
            component={
                <Label
                    id={id}
                    selected={selected}
                    label={displayName}
                    onChange={onChange}
                />
            }
        >
            {children.map(c => (
                <Element
                    key={c.id}
                    id={c.id}
                    selected={selected}
                    displayName={c.displayName}
                    children={c.children}
                    onChange={onChange}
                />
            ))}
        </Node>
    )
}

export const Tree = ({ onSelect }) => {
    const [roots, setRoots] = useState(null)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const init = async () => {
            const orgUnits = await getOrgUnitTree()
            onChange(orgUnits[0].id)
            setRoots(orgUnits)
        }

        init()
    }, [])

    const onChange = id => {
        setSelected(id)
        onSelect(id)
    }

    if (!roots) return <CenteredLoader />

    return (
        <section>
            {roots.map(({ id, displayName, children }) => (
                <Element
                    key={id}
                    id={id}
                    displayName={displayName}
                    children={children}
                    selected={selected}
                    onChange={onChange}
                    initialOpen
                />
            ))}
        </section>
    )
}
