import LoaderWrapperStyles from "./LoaderWrapperStyles";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import classNames from "classnames";

interface LoaderWrapperProps {
    children: JSX.Element
    loading: boolean
}

const LoaderWrapper = (props: LoaderWrapperProps) => {
    const {children, loading} = props;

    const antIcon = <LoadingOutlined style={{fontSize: '4em'}} spin/>;
    const LoadingBlock = (
        <div className={'loading-block'}>
            <Spin indicator={antIcon}/>
        </div>
    );


    return (
        <LoaderWrapperStyles>
            {loading && LoadingBlock}
            <div
                className={classNames({
                    'child-blur': loading
                })}
            >
                {children}
            </div>

        </LoaderWrapperStyles>
    );
};

export default LoaderWrapper;