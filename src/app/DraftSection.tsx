import React, { useEffect } from 'react'
import { AllPickDataI, PickDataI, usePickData } from './pickData.tsx'
import ColorConfig, { useColorConfig } from './ColorConfig.tsx'
import { useForceRerender } from './forceRender.tsx'
import { TransitionPickObserver } from './observer.tsx'
import { PackCards } from './dom.tsx'
import Card from './Card.tsx'
import { colors } from './common.tsx'

export function DraftSection() {
    const {data, loading, error} = usePickData()
    const shouldModified = (data != undefined) && (!loading) && (error == null)

    const draftPickOptions = document.querySelector<Element>('div.draft_pick_options')

    if(shouldModified) {
        draftPickOptions?.setAttribute('hidden', 'true')
        return <ModifiedDraftSection pickdata={data} />
    } else {
        draftPickOptions?.removeAttribute('hidden')
        return (<></>)
    }
}

function getCardList(pickdata: AllPickDataI) {
    const allinfo = PackCards()
    const defaultCard = Object.fromEntries([...colors, 'alsa'].map(key => [key, null]))
    const cards = allinfo.map(info => {
        var data: PickDataI = defaultCard
        if(info.name) {
            if(info.name in pickdata.data) {
                data = pickdata.data[info.name] || defaultCard
            }
        }
        return {...info, data: data}
    })
    return cards.sort((a, b) => {
        return (a.data.alsa || Number.MAX_SAFE_INTEGER) - (b.data.alsa || Number.MAX_SAFE_INTEGER)
    })
}

function ModifiedDraftSection({pickdata}: {pickdata: AllPickDataI}) {
    const forceRender = useForceRerender()
    const [colorConfig, colorConfigHooks] = useColorConfig()

    useEffect(() => {
        const obs = new TransitionPickObserver(() => {
            forceRender()
        })
        obs.observe()

        return () => {
            obs.disconnect()
        }
    }, [])

    const cardList = getCardList(pickdata)

    return (
        <div>
            <div>
                更新日時: {pickdata.update}
            </div>
            <div>
                <ColorConfig colorConfigHooks={colorConfigHooks} colorConfig={colorConfig}/>
            </div>
            <div className='draft_pick_options'>
                {cardList.map(info => {
                    return (
                        <div>
                            <Card info={info} colorConfig={colorConfig} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
