import React, { Component } from 'react';
import ReactCrop, { getPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */
const getCroppedImg = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    img.src = image;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        img,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            file.name = fileName;
            resolve(file);
        }, 'image/jpeg');
    });
};

class ImageCrop extends Component {
    constructor(props) {
        super(props);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            src: props.src,
            crop: {},
        };
    }

    onImageLoaded(image) {
        const {src} = this.state;
        const {aspect} = this.props;
        const crop = makeAspectCrop({
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            aspect: aspect || 1,
        }, image.width / image.height);
        this.setState({crop});
        const pixelCrop = getPixelCrop(image, crop);
        getCroppedImg(src, pixelCrop, `avatar-${Date.now()}.jpg`)
            .then(logo => this.props.onComplete(logo));
    }

    onChange(crop) {
        this.setState({crop});
    }

    render() {
        const {
            src, crop,
        } = this.state;
        return (
            <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={(crop, pixelCrop) => {
                    getCroppedImg(src, pixelCrop, `avatar-${Date.now()}.jpg`)
                        .then(logo => this.props.onComplete(logo));
                }}
                onChange={this.onChange}
            />);
    }
}

export default ImageCrop;
