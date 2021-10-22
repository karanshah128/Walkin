import React from 'react';
import useGlobalState from './Context';

const WithGlobalState = (props) => {
    const [globalState, dispatch] = useGlobalState();
    return React.cloneElement(props.children, { globalState, dispatch })
}

export default WithGlobalState;
