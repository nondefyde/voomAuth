import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'reactstrap';
import { uiCropClose, uiCropSave, uiCropUpdate } from '../../redux/actions';
import ImageCrop from '../ImageCrop';
import Progress from '../Progress';

class ImageCropOverlay extends Component {

    constructor(props) {
        super(props);
        this.blobStore = null;
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSave() {
        const {type} = this.props;
        const {blobStore} = this;
        this.props.uiCropSave(blobStore, type);
    }

    onClose() {
        this.props.uiCropClose();
    }

    render() {
        const {
            isOpen,
            image,
            isSavingImage,
            type,
        } = this.props;
        const aspect = 4 / 4;
        return (
            <Modal isOpen={isOpen} className="ImageCropOverlay">
                <ImageCrop
                    type={type}
                    src={image}
                    onComplete={(blob) => {
                        this.blobStore = blob;
                        return null;
                    }}
                    aspect={aspect}
                />
                <div className="mt-4 text-right p-3">
                    <Button
                        color="secondary"
                        outline
                        className="btn-undo"
                        onClick={this.onClose}
                        disabled={isSavingImage}
                    >
                        Undo
                    </Button>
                    &nbsp;
                    <Button
                        color="primary"
                        onClick={this.onSave}
                        disabled={isSavingImage}
                    >
                        {!isSavingImage ? 'Save' : <Progress style={{top: 3}}/>}
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default connect(
    ({ui: {crop, loading}}) => ({
        isOpen: crop.open,
        image: crop.current && crop[crop.current] && crop[crop.current].image ? crop[crop.current].image : '',
        isSavingImage: loading.saveCroppedImage,
        type: crop.current && crop[crop.current] && crop[crop.current].type ? crop[crop.current].type : 'upload',
    }),
    {
        uiCropClose, uiCropUpdate, uiCropSave,
    },
)(ImageCropOverlay);
