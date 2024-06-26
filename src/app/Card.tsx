import React from "react"
import { colors, pick_data } from "./common"

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

type Props = {
    original: Element
    colorConfig: Set<string>
}


const Card = (props: Props) => {
    const originalRef = React.useRef<HTMLDivElement>(null)

    const div = props.original.cloneNode(true)

    React.useEffect(() => {
        if (originalRef.current) {
            originalRef.current.innerHTML=''
            originalRef.current.appendChild(div);
        }
    })

    const name = props.original.querySelector('img.card_slot_2')?.getAttribute('alt')??''
    const data = pick_data[name]

    if (data) {
        const alsa = alsaText(data['alsa'])

        return (
            <div style={{textAlign: 'center'}}>
            <div ref={originalRef}/>
            <div>alsa: {alsa}</div>
            {colors.map((c) => {
                const gih = data[c]
                var opacity = 1
                if(props.colorConfig.has(c) || props.colorConfig.size == 0) {
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
    } else {
        return (
            <div style={{textAlign: 'center'}}>
                <div ref={originalRef}></div>
            </div>
        )
    }

}

export default Card
