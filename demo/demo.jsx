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
        maxHeight: 80,
      };
    }

    onButtonClick() {
      this.setState({
        crop: {
          x: 20,
          y: 5,
          aspect: 1,
          width: 30,
          height: 50,
        },
      });
    }

    onImageLoaded(crop) {
      console.log('Image was loaded. Crop:', crop);
      // this.setState({
      //  crop: {
      //    aspect: 16/9,
      //    width: 30,
      //  }
      // });
    }

    onCropComplete(crop) {
      console.log('Crop move complete:', crop);
      this.setState({ hello: Date.now(), crop });
    }

    // onCropChange: function(crop) {
    //  console.log('Crop change');
    // },

    render() {
      return (
        <div style={{width: '30em', margin: '10em auto'}}>
          <ReactCrop
            {...this.state}
            src={url}
            onImageLoaded={(crop) => this.onImageLoaded(crop)}
            onComplete={(crop) => this.onCropComplete(crop)}
            // onChange={this.onCropChange}
          />
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
