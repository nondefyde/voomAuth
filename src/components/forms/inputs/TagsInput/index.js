import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './override.css';

export default ({
                    input, placeholder, meta, className, selected, style, ...rest
                }) => {
    return <TagsInput
        {...input}
        value={input.value || []}
        inputProps={{
            placeholder: placeholder || 'Type to add new'
        }}
        onChange={(tags = []) => input.onChange(tags)}
        className={`${meta.invalid && meta.error ? 'is-invalid' : ''}`}
        {...rest}/>;
};
