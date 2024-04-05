export interface MinMaxValueInterface {
    min?: number,
    max?: number
}

export interface MinMaxPropsInterface {
    title: string
    value: MinMaxValueInterface
    setValue: (value: MinMaxValueInterface) => void
}

export interface SwitchPropsInterface {
    title: string
    value: boolean
    setValue: (value: boolean) => void
}