import MinMaxStyles from "./MinMaxStyles";
import {MinMaxPropsInterface} from "../../../interfaces/inputInterfaces";
import {InputNumber} from "antd";

const MinMaxInput = (props: MinMaxPropsInterface) => {
    const {title, value, setValue} = props;

    const setItemValue = (itemValue: number | null, itemName: string) => {
        if (itemValue || itemValue === 0) {
            setValue({
                ...value,
                [itemName]: itemValue
            })
        }
    }

    return (
        <MinMaxStyles>
            <div className={'title'}>{title}</div>
            <div className={'mark'}>from:</div>
            <InputNumber
                value={value.min}
                onChange={e => setItemValue(e, 'min')}
                max={value.max}
                min={0}
            />
            <div className={'mark'}>to:</div>
            <InputNumber
                value={value.max}
                onChange={e => setItemValue(e, 'max')}
                min={value.min}
            />
        </MinMaxStyles>
    )
}

export default MinMaxInput