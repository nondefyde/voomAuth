import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';

export default ({input, placeholder, dateFormat, meta, className, selected, style, ...rest}) => {
    return <DatePicker
        {...input}
        value={input.value ? moment.utc(input.value).format('DD-MM-YYYY') : undefined}
        dateFormat={dateFormat || 'DD-MM-YYYY'}
        className={` ${className || ''} ${meta.invalid && meta.error ? 'is-invalid' : ''}`}
        placeholderText={placeholder || 'Click to select a date'}
        selected={input.value || undefined}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        style={style}
        {...rest}
    />;
};
