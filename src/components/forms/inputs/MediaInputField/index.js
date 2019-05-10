import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormFeedback, Input } from 'reactstrap';
import { uiCropClearCurrent, uiCropOpen } from '../../../../redux/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const propTypes = {
    uiCropOpen: PropTypes.func.isRequired,
    uiCropClearCurrent: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
    file: PropTypes.shape({
        url: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
    })
};

const defaultProps = {
    loading: true,
};

class MediaInputField extends Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const {onFileReady, file} = this.props;
        if (file) {
            const name = this.props.input.name;
            onFileReady({[name]: file});
            if (prevProps && prevProps.file && file.url === prevProps.file.url) {
                this.props.uiCropClearCurrent();
            }
        }
    }

    handleFileChange(e) {
        const {uiCropOpen} = this.props;
        const input = e.target;
        const name = input.name;
        if (input.files && input.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', (file) => {
                const image = new Image();
                image.src = file.target.result;
                image.onload = () => {
                    uiCropOpen(reader.result, name, `${name}`);
                    input.value = '';
                };
            }, false);
            reader.readAsDataURL(input.files[0]);
        } else {

        }
    }

    render() {
        const props = _.omit(this.props, ['uiCropOpen', 'uiCropClearCurrent', 'onFileReady', 'value']);
        const {
            input, className, disabled, meta: {touched, error, warning}, ...rest
        } = props;
        const omittedValueInput = _.omit(input, ['value']);
        return (
            <Fragment>
                <Input {...rest}
                       {...omittedValueInput}
                       type='file'
                       onChange={this.handleFileChange}
                       disabled={disabled}
                       className={classNames('form-control', className, {'is-invalid': touched && error})}/>
                {touched && error && <FormFeedback className="d-block">{error}</FormFeedback>}
            </Fragment>
        );
    }
}

MediaInputField.propTypes = propTypes;
MediaInputField.defaultProps = defaultProps;
const stateProps = (state, ownProps) => ({
    loading: state.ui.loading,
    file: state.ui.crop[ownProps.input.name] && state.ui.crop[ownProps.input.name].uploaded
        ? state.ui.crop[ownProps.input.name].uploaded : null,
});

const dispatchProps = {
    uiCropOpen, uiCropClearCurrent,
};
export default connect(stateProps, dispatchProps)(MediaInputField);
