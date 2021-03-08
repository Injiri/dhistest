import {get, put} from './crud'

export {setBaseUrl} from './crud'

export const getOrgUnitTree = async () => {
    const me = await get('me?fields=organisationUnits')
    const rootIds = me.organisationUnits.map(ou => ou.id)

    const response = await get(
        'organisationUnits?paging=false&fields=id,displayName,path,children'
    )
    const allOrgUnits = response.organisationUnits.filter(ou =>
        rootIds.some(r => ou.path.includes(r))
    )

    const tree = allOrgUnits.filter(ou => rootIds.some(r => ou.id === r))

    tree.forEach(root => {
        const setChildren = parent => {
            parent.children = allOrgUnits.filter(ou =>
                parent.children.some(c => c.id === ou.id)
            )
            parent.children.forEach(c => setChildren(c))
        }
        setChildren(root)
    })

    return tree
}
//https://play.dhis2.org/2.34.3/api/analytics.json?dimension=dx:FTRrcoaog83&dimension=pe:2019&filter=ou:U6Kr7Gtpidn&displayProperty=NAME&outputIdScheme=UID
//Accute Flaccid Paralysis (Deaths < 5 yrs)
export const getOrgUnitAccuteFlaccidParalysisAnalytics = async ou => {
    const response = await get(`analytics.json?dimension=dx:FTRrcoaog83&dimension=pe:2019&filter=ou:${ou}&displayProperty=NAME&outputIdScheme=UID`)
    if (response.status == 'ERROR') {
        console.log(response.message)
    }
    return response
}

export const getOrgUnit = async orgUnitId => {
    const response = await get(`organisationUnits/${orgUnitId}?paging=false`)

    if (response.status === 'ERROR') {
        console.error(response.message)
        return
    }

    return response
}

export const setOrgUnitCode = async orgUnit => {
    const response = await put(`organisationUnits/${orgUnit.id}`, orgUnit)
    return response.status === 'OK'
}
