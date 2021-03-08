import React from 'react'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import { DataProvider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui-widgets'

const StickyHeaderBar = styled(HeaderBar)`
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
`

export const Header = ({ baseUrl, appName, apiVersion }) => (
    <DataProvider baseUrl={baseUrl} apiVersion={apiVersion}>
        <StickyHeaderBar appName={appName} />
    </DataProvider>
)

Header.propTypes = {
    baseUrl: string.isRequired,
    appName: string.isRequired,
    apiVersion: number.isRequired,
}
