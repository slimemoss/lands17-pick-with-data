import React from "react"
import Card from "./Card"
import ColorConfig, { useColorConfig } from "./ColorConfig"

type Props = {
    original: Element
    dammy: string
}

const PickOption = (props: Props) => {
    const [colorConfig, colorConfigHooks] = useColorConfig()

    return (
        <div>
            <div>
                <ColorConfig colorConfigHooks={colorConfigHooks} colorConfig={colorConfig}/>
            </div>
            <div className="draft_pick_options">
                {[...props.original.querySelectorAll('div.card_slot_2')].map((div) => {
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
