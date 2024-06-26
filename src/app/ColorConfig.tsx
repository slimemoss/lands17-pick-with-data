import React from "react"
import { colors } from "./common"

type ColorConfigHooks = {
    add: (color: string) => void
    rm: (color: string) => void
    fix: (color: string, check: boolean) => void
}

export const useColorConfig = (): [Set<string>, ColorConfigHooks] => {
    const [select, setSelect] = React.useState<Set<string>>(new Set())

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

    return [select, {add, rm, fix}]
}

const ColorConfig = ({ colorConfig, colorConfigHooks }: { colorConfig: Set<string>, colorConfigHooks: ColorConfigHooks }) => {
    return (
        <div style={{display: 'flex', gap: '10px'}}>
            {colors.map((c) => {
                return (
                    <div>
                        <input type="checkbox" checked={colorConfig.has(c)}
                               onChange={(e) => {
                                   colorConfigHooks.fix(c, e.target.checked)
                               }}/>
                        <label>{c}</label>
                    </div>
                )
            })}            
        </div>
    )
}

export default ColorConfig
