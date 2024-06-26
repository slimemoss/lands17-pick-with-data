import React from "react"
import Card from "./Card"
import ColorConfig, { useColorConfig } from "./ColorConfig"
import { divToData } from "./Card"

type Props = {
    original: Element
    dammy: string
}

const divToAlsa = (div: Element) => {
    const data = divToData(div)
    if(data) {
        if(data['alsa']) {
            return data['alsa']
        }
    }
    return Number.MAX_VALUE
}

const PickOption = (props: Props) => {
    const [colorConfig, colorConfigHooks] = useColorConfig()

    return (
        <div>
            <div>
                <ColorConfig colorConfigHooks={colorConfigHooks} colorConfig={colorConfig}/>
            </div>
            <div className="draft_pick_options">
                {[...props.original.querySelectorAll('div.card_slot_2')].sort((a, b) => {
                    return divToAlsa(a) - divToAlsa(b)
                }).map((div) => {
                    return (
                        <div>
                            <Card original={div} colorConfig={colorConfig}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PickOption
