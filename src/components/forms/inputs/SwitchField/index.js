import React from 'react';
import { AppSwitch } from '@coreui/react';

export default ({input, ...rest}) => {
    return (
        <AppSwitch
            {...input}
            checked={input.value || false}
            onChange={(value) => input.onChange(value)}
            className={'mx-1'}
            color={'primary'}
            outline={'alt'}
            label
            dataOn={'\u2713'}
            dataOff={'\u2715'}
        />
    )
};
