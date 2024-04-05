import {Switch} from "antd";
import SwitchInputStyles from "./SwitchInputStyles";
import {SwitchPropsInterface} from "../../../interfaces/inputInterfaces";

const SwitchInput = (props: SwitchPropsInterface) => {
    const {
        setValue,
        title,
        value
    } = props;

    return (
        <SwitchInputStyles>
            <Switch checked={value} onChange={setValue}/>
            <div>{title}</div>
        </SwitchInputStyles>
    )
}

export default SwitchInput