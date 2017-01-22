import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line
import ReactCrop from '../lib/ReactCrop';

/**
 * Load the image in the crop editor.
 */
const cropEditor = document.querySelector('#crop-editor');

function loadEditView(url) {
  class Parent extends Component {
    constructor() {
      super();
      this.state = {
        crop: {
          x: 0,
          y: 0,
        },
      };

      this.image = new Image();
      this.image.src = url;
    }

    onCropChange(crop) {
      console.debug(crop);
    }

    onImageLoaded(crop) {
      console.log('Image was loaded. Crop:', crop);
    }

    onCropComplete(crop, pixelCrop, zoomCrop) {
      console.log('Crop move complete:', crop, pixelCrop, zoomCrop);
      this.setState({ hello: Date.now(), crop });

      var canvas = this.refs.canvas;
      canvas.width = zoomCrop.width;
      canvas.height = zoomCrop.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(
        this.image,
        zoomCrop.x,
        zoomCrop.y,
        zoomCrop.width,
        zoomCrop.height,
        0,
        0,
        zoomCrop.width,
        zoomCrop.height,
      );
    }

    // onCropChange: function(crop) {
    //  console.log('Crop change');
    // },

    render() {
      return (
        <div style={{width: '30em', margin: '1em auto'}}>
          <ReactCrop
            crop={this.state.crop}
            src={url}
            onImageLoaded={this.onImageLoaded.bind(this)}
            onComplete={this.onCropComplete.bind(this)}
            // onChange={this.onCropChange}
          />
          {/* <pre>{JSON.stringify(this.state.crop, null, 2)}</pre> */}
          <canvas width="100" height="100" ref="canvas" style={{boder: '10px solid red', width: '300px'}}></canvas>
        </div>
      );
    }
  }

  ReactDOM.render(<Parent />, cropEditor);
}

/**
 * Select an image file.
 */

loadEditView('https://c7.staticflickr.com/6/5630/30569330894_9e5f7feeb1_n.jpg');
