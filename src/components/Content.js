import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Sidebar, Main } from '.'
import { getOrgUnit } from '../api'

const Container = styled.section`
    display: flex;
    margin-top: 48px;
    min-height: calc(100vh - 48px);
`

export const Content = () => {
    const [orgUnit, setOrgUnit] = useState(null)

    const getData = async id => setOrgUnit(await getOrgUnit(id))

    const onSelect = id => getData(id)


    return (
        <Container>
            <Sidebar onSelect={onSelect} />
            {orgUnit && <Main orgUnit={orgUnit} />}
        </Container>
    )
}
