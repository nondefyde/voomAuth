import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.min.css';

export default ({input, placeholder, meta, className, options, style, loading, onSearch, ...rest}) => {
    return (
        <AsyncTypeahead
            {...input}
            className={`${className || ''} ${meta.invalid && meta.error ? 'is-invalid' : ''}`}
            labelKey="name"
            // allowNew
            value={input.value}
            multiple
            isLoading={loading}
            selectHintOnEnter
            options={options}
            minLength={1}
            onChange={(values) => input.onChange(values.map(value => value.name))}
            onBlur={() => input.onBlur(input.value)}
            onSearch={(value) => onSearch(value)}
            placeholder={placeholder || 'Type a term to search'}
            renderMenuItemChildren={(option, props) => (
                <span key={option.id}>{option.name}</span>
            )}
            {...rest}
        />
    )
};
