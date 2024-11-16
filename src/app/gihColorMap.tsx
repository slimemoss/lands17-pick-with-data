import { AllPickDataI } from "./pickData"
import { colors } from './common'

const colorMap = [
    'rgba(0, 255, 0, 0.4)',
    'rgba(0, 255, 0, 0.2)',
    'rgba(0, 255, 0, 0.1)',
    'rgba(0, 255, 0, 0.0)',
    'rgba(255, 0, 0, 0.15)',
    'rgba(255, 0, 0, 0.3)'
]


function splitQuantity(gihs: number[]) {
    const sortedGih = gihs.sort((a, b) => b - a)
    const boundaries: number[] = []
    for (let i = 1; i < colorMap.length; i++) {
        const index = Math.floor(i * sortedGih.length / colorMap.length)
        boundaries.push(sortedGih[index])
    }
    return boundaries
}

function splitRange(gihs: number[]) {
    const max = Math.max(...gihs)
    const min = Math.min(...gihs)
    const boundaries: number[] = []
    for (let i = 1; i <= 5; i++) {
        boundaries.push(min + (max - min) / 6 * i)
    }
    return boundaries.reverse()
}

export function gihColorFuncSplitWay(data: AllPickDataI) {
    const cards = Object.values(data.data)
    const gihs = cards.flatMap(card => colors.map(color => card[color]))
                           .filter(value => typeof value === 'number')

    const boundaries = splitQuantity(gihs)
    console.log(boundaries)
    return (gih: number): string => {
        let rangeIndex = 5
        for (let i = 0; i < boundaries.length; i++) {
            if (gih > boundaries[i]) {
                rangeIndex = i;
                break;
            }
        }
        return colorMap[rangeIndex]
    }

}

export function gihColorFunc(data: AllPickDataI) {
    const cards = Object.values(data.data)
    const gihs = cards.flatMap(card => colors.map(color => card[color]))
                      .filter(value => typeof value === 'number')
                      .sort((a, b) => b - a)
    return (gih: number): string => {
        const rank = gihs.indexOf(gih) + 1
        const percentage = (rank / gihs.length)

        return 'rgba('
             + (percentage < 0.5 ? '0, 255,' : '255, 0,')
             + '0,'
             + Math.pow(Math.abs(percentage - 0.5) * 2, 1.7) * 0.4
             + ')'
    }
}
