import React from 'react'
import { number, string } from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { CssReset } from '@dhis2/ui-core'
import { Header, Content } from '.'
import 'typeface-roboto'

const BodyStyle = createGlobalStyle`
    body {
        margin: 0;
        background-color: rgba(0,0,10,.05);
    }z
`

export const App = ({ baseUrl, appName, apiVersion }) => (
    <>
        <BodyStyle />
        <CssReset />
        <Header baseUrl={baseUrl} appName={appName} apiVersion={apiVersion} />
        <Content />
    </>
)

App.propTypes = {
    baseUrl: string.isRequired,
    appName: string.isRequired,
    apiVersion: number.isRequired,
}
