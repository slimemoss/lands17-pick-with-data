import React from "react"
import { PickDataI } from "./pickData"
import { colors } from "./common"

const gihColor = (gih: number | null): string => {
    var color = ''
    if (!gih) {
        return ''
    }
    if (gih > 0.60) {
        color = 'rgba(0, 255, 0, 0.4)'
    } else if (gih > 0.58) {
        color = 'rgba(0, 255, 0, 0.2)'
    } else if (gih > 0.56) {
        color = 'rgba(0, 255, 0, 0.1)'
    } else if (gih > 0.54) {
        color = 'rgba(0, 255, 0, 0.0)'
    } else if (gih > 0.52) {
        color = 'rgba(255, 0, 0, 0.15)'
    } else {
        color = 'rgba(255, 0, 0, 0.3)'
    }
    return color
}

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

const Card = ({info, colorConfig}: {
    info: {
        data: PickDataI, name: string | null | undefined, div: Node
    },
    colorConfig: Set<string>
}) => {

    const originalRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (originalRef.current) {
            originalRef.current.innerHTML=''
            originalRef.current.appendChild(info.div);
        }
    })

    const alsa = alsaText(info.data['alsa'])

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
                <div style={{backgroundColor: gihColor(gih), opacity: opacity}}>
                    {c}: {gihText(gih).replace(/ /g, "\u00A0")}
                </div>
            )
        })}
        </div>
    )

}

export default Card
