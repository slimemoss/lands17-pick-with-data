import { useEffect, useState } from 'react'
import { gihColorFunc } from './gihColorMap'

export type AllPickDataI = {
    update: string,
    data: {
        [dict_key: string]: PickDataI
    }
}

export type PickDataI = {
    [dict_key: string]: number | null
}

export function usePickData() {
    const url = `https://raw.githubusercontent.com/slimemoss/
lands17-pick-with-data/refs/heads/master/public_data/card_data.json`

    const [data, setData] = useState<AllPickDataI | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Tampermonkey.ErrorResponse | null>(null)

    const fetch = typeof GM.xmlHttpRequest ? GM.xmlHttpRequest : GM_xmlhttpRequest

    useEffect(() => {
        fetch({
            method: 'GET',
            url: url,
            onload: response => {
                setData(JSON.parse(response.responseText))
                setLoading(false)
            },
            onerror: error => {
                setError(error)
                setLoading(false)
            }
        })
    }, [])

    return {
        data, loading, error,
        gihColor: data ? gihColorFunc(data) : (_: number) => { return '' }
    }
}
