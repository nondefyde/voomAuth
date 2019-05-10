import React from 'react';
import './react-datetime.css';
import './override.css';
import ReactDateTime from 'react-datetime';
import moment from 'moment-timezone';

export default ({
                    input, placeholder, dateFormat, meta, className, selected, style, ...rest
                }) => {
    return <ReactDateTime
        {...input}
        value={moment.utc(input.value).format('DD-MM-YYYY hh:mm A')}
        dateFormat="DD-MM-YYYY"
        timeFormat="hh:mm A"
        className={`${className || ''} ${meta.invalid && meta.error ? 'is-invalid' : ''}`}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        style={{
            ...style,
            fontSize: '14.5px'
        }}
        {...rest}
    />;
};
