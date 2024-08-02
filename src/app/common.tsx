import PickData from './data/blb.json'

type PickDataT = {
  [dict_key: string]: {
    [dict_key: string]: number | null
  }
}

export const pick_data = PickData as PickDataT

export const colors = ['wu', 'wb', 'wr', 'wg', 'ub', 'ur', 'ug', 'br', 'bg', 'rg']
