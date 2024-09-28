import { useEffect, useState } from 'react'
import { colors } from './common'
colors

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

    useEffect(() => {
        GM.xmlHttpRequest({
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

    return {data, loading, error}
}
