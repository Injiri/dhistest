import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {App} from './components'
import {setBaseUrl} from './api'

/**
 * This is what is displayed in the header bar
 */
const appName = 'App Name'

//dhis2 test url
const developmentServer = 'https://play.dhis2.org/2.35.1'

/**
 * Passed to DataProvider to get various data for the header bar.
 */
const apiVersion = 31

const rootElement = document.getElementById('root')

const productionRender = async () => {
    try {
        const manifest = await (await fetch('./manifest.webapp')).json()
        render(manifest.activities.dhis.href)
    } catch (error) {
        console.error('Could not read manifest:', error)
        ReactDOM.render(<code>No manifest found</code>, rootElement)
    }
}

const render = baseUrl => {
    setBaseUrl(`${baseUrl}/api`)
    ReactDOM.render(
        <App appName={appName} baseUrl={baseUrl} apiVersion={apiVersion}/>,
        rootElement
    )
    serviceWorker.unregister()
}

if (process.env.NODE_ENV === 'production') productionRender()
else render(developmentServer)
