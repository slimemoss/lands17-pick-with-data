import React from "react"
import { PickDataI } from "./pickData"
import { colors } from "./common"

const gihText = (v: number | null):string => {
    var res = ''
    if (v) {
        res = (v * 100).toPrecision(3).toString()
    } else {
        res = '   -    '
    }
    return res
}

const alsaText = (v: number | null): string => {
    if (v) {
        return v.toPrecision(3).toString()
    } else {
        return '  - '
    }
}

const Card = ({info, colorConfig, gihColor}: {
    info: {
        data: PickDataI, name: string | null | undefined, div: Node
    },
    colorConfig: Set<string>,
    gihColor: (gih: number) => string
}) => {

    const originalRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (originalRef.current) {
            originalRef.current.innerHTML=''
            originalRef.current.appendChild(info.div);
        }
    })

    const alsa = alsaText(info.data['alsa'])

    const nullableGihColor = (gih: number | null): string => {
        if(gih) {
            return gihColor(gih)
        } else {
            return ''
        }
    }

    return (
        <div style={{textAlign: 'center'}}>
        <div ref={originalRef}/>
        <div>alsa: {alsa}</div>
        {colors.map((c) => {
            const gih = info.data[c]
            var opacity = 1
            if(colorConfig.has(c) || colorConfig.size == 0) {
            }else {
                opacity = 0.3
            }
            return (
                <div style={{backgroundColor: nullableGihColor(gih), opacity: opacity}}>
                    {c}: {gihText(gih).replace(/ /g, "\u00A0")}
                </div>
            )
        })}
        </div>
    )

}

export default Card
