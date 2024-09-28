import React, { useState } from "react"

import ManaIcons from './data/mana.json'
import { colors } from "./common"

type ManaIconsT = {
    [dict_key: string]: string
}

const mana_icons = ManaIcons as ManaIconsT

type ColorConfigHooks = {
    add: (color: string) => void
    rm: (color: string) => void
    fix: (color: string, check: boolean) => void
    toggle: (color: string) => void
}

export const useColorConfig = (): [Set<string>, ColorConfigHooks] => {
    const [select, setSelect] = useState<Set<string>>(new Set())

    const add = (color: string) => {
        const res = new Set(select)
        res.add(color)
        setSelect(res)
    }

    const rm = (color: string) => {
        const res = new Set(select)
        res.delete(color)
        setSelect(res)
    }

    const fix = (color: string, check: boolean) => {
        if(check){add(color)}
        else{rm(color)}
    }

    const toggle = (color: string) => {
        if (select.has(color)) {
            rm(color)
        } else {
            add(color)
        }
    }

    return [select, {add, rm, fix, toggle}]
}

export function ColorConfig({ colorConfig, colorConfigHooks }: { colorConfig: Set<string>, colorConfigHooks: ColorConfigHooks }) {
    const shouldRight = (c: string) => {
        return colorConfig.size == 0 || colorConfig.has(c)
    }

    return (
        <div style={{display: 'flex', gap: '10px', margin: '8px'}}>
            {colors.map((c) => {
                return (
                    <div>
                        <img src={"data:image/png;base64," + mana_icons[c]} width="25rem"
                             style={{filter: shouldRight(c) ? 'brightness(100%)' : 'brightness(50%)'}}
                             onClick={() => {
                                 colorConfigHooks.toggle(c)
                             }}
                        />
                    </div>
                )
            })}            
        </div>
    )
}

export default ColorConfig
