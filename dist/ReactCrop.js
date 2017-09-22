module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _throttle = __webpack_require__(3);

	var _throttle2 = _interopRequireDefault(_throttle);

	var _vector2d = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Waiting for bug fix: https://github.com/yannickcr/eslint-plugin-react/issues/507
	/* eslint-disable react/sort-comp */

	var ReactCrop = function (_Component) {
	  _inherits(ReactCrop, _Component);

	  function ReactCrop(props) {
	    _classCallCheck(this, ReactCrop);

	    var _this = _possibleConstructorReturn(this, (ReactCrop.__proto__ || Object.getPrototypeOf(ReactCrop)).call(this, props));

	    _this.onDocMouseTouchMove = _this.onDocMouseTouchMove.bind(_this);
	    _this.onDocMouseTouchEnd = _this.onDocMouseTouchEnd.bind(_this);
	    _this.onImageLoad = _this.onImageLoad.bind(_this);
	    _this.onComponentMouseTouchDown = _this.onComponentMouseTouchDown.bind(_this);
	    _this.onComponentKeyDown = _this.onComponentKeyDown.bind(_this);
	    _this.onCropMouseTouchDown = _this.onCropMouseTouchDown.bind(_this);
	    _this.onWheel = _this.onWheel.bind(_this);
	    _this.onMouseOver = _this.onMouseOver.bind(_this);
	    _this.onMouseOut = _this.onMouseOut.bind(_this);
	    _this.onWindowScroll = _this.onWindowScroll.bind(_this);
	    _this.onPanMouseMove = _this.onPanMouseMove.bind(_this);

	    _this.renderCanvases = (0, _throttle2.default)(_this.renderCanvases.bind(_this), 30, { leading: true, trailing: true });

	    _this.state = {
	      crop: _this.nextCropState(props.crop),
	      polygonId: _this.getRandomInt(1, 900000),
	      zoom: 1,
	      mode: 'crop' };
	    return _this;
	  }

	  _createClass(ReactCrop, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.addEventListener('mousemove', this.onDocMouseTouchMove);
	      document.addEventListener('touchmove', this.onDocMouseTouchMove);

	      document.addEventListener('mouseup', this.onDocMouseTouchEnd);
	      document.addEventListener('touchend', this.onDocMouseTouchEnd);
	      document.addEventListener('touchcancel', this.onDocMouseTouchEnd);

	      if (this.imageRef.complete || this.imageRef.readyState) {
	        if (this.imageRef.naturalWidth === 0) {
	          // Broken load on iOS, PR #51
	          // https://css-tricks.com/snippets/jquery/fixing-load-in-ie-for-cached-images/
	          // http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
	          var src = this.imageRef.src;
	          var emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	          this.imageRef.src = emptyGif;
	          this.imageRef.src = src;
	        } else {
	          // Fixme: this is causing a double onImageLoaded event in normal cases.
	          this.onImageLoad(this.imageRef);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      if (nextProps.crop) {
	        (function () {
	          var nextCrop = _this2.nextCropState(nextProps.crop);
	          var aspectRatioChanged = _this2.state.crop.aspect && nextCrop.aspect !== _this2.state.crop.aspect;

	          if (nextCrop.aspect) {
	            nextCrop = _this2.ensureAspectDimensions(nextCrop, _this2.imageRef);
	          }

	          _this2.cropInvalid = _this2.isCropInvalid(nextCrop);
	          _this2.setState({ crop: nextCrop }, function () {
	            if (aspectRatioChanged && _this2.props.onAspectRatioChange) {
	              _this2.props.onAspectRatioChange(nextCrop, _this2.getPixelCrop(nextCrop));
	            }
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      document.removeEventListener('mousemove', this.onDocMouseTouchMove);
	      document.removeEventListener('touchmove', this.onDocMouseTouchMove);

	      document.removeEventListener('mouseup', this.onDocMouseTouchEnd);
	      document.removeEventListener('touchend', this.onDocMouseTouchEnd);
	      document.removeEventListener('touchcancel', this.onDocMouseTouchEnd);

	      window.removeEventListener('scroll', this.onWindowScroll, false);
	    }
	  }, {
	    key: 'getScale',
	    value: function getScale() {
	      var rect = this.imageRef.getBoundingClientRect();
	      return this.imageRef.width / (rect.right - rect.left);
	    }
	  }, {
	    key: 'onDocMouseTouchMove',
	    value: function onDocMouseTouchMove(e) {
	      if (this.props.disabled) {
	        return;
	      }

	      if (!this.mouseDownOnCrop) {
	        return;
	      }

	      e.preventDefault(); // Stop drag selection.

	      var crop = this.state.crop;

	      var evData = this.evData;
	      var clientPos = this.getClientPos(e);

	      if (evData.isResize && crop.aspect && evData.cropOffset) {
	        clientPos.y = this.straightenYPath(clientPos.x);
	      }

	      var scale = this.getScale();
	      var xDiffPx = (clientPos.x - evData.clientStartX) * scale;
	      evData.xDiffPc = xDiffPx / evData.imageWidth * 100;

	      var yDiffPx = (clientPos.y - evData.clientStartY) * scale;
	      evData.yDiffPc = yDiffPx / evData.imageHeight * 100;

	      if (evData.isResize) {
	        this.resizeCrop();
	      } else {
	        this.dragCrop();
	      }

	      this.cropInvalid = false;

	      // const zoomedCrop = this.zoomCrop(crop);
	      if (this.props.onChange) {
	        this.props.onChange(crop, this.getPixelCrop(crop));
	      }

	      this.setState({ crop: crop });
	    }
	  }, {
	    key: 'onCropMouseTouchDown',
	    value: function onCropMouseTouchDown(e) {
	      if (this.props.disabled) {
	        return;
	      }

	      e.preventDefault(); // Stop drag selection.

	      var crop = this.state.crop;

	      var clientPos = this.getClientPos(e);

	      // Focus for detecting keypress.
	      this.componentRef.focus();

	      var ord = e.target.dataset.ord;
	      var xInversed = ord === 'nw' || ord === 'w' || ord === 'sw';
	      var yInversed = ord === 'nw' || ord === 'n' || ord === 'ne';

	      var cropOffset = void 0;

	      if (crop.aspect) {
	        cropOffset = this.getElementOffset(this.cropSelectRef);
	      }

	      this.evData = {
	        imageWidth: this.imageRef.width,
	        imageHeight: this.imageRef.height,
	        clientStartX: clientPos.x,
	        clientStartY: clientPos.y,
	        cropStartWidth: crop.width,
	        cropStartHeight: crop.height,
	        cropStartX: xInversed ? crop.x + crop.width : crop.x,
	        cropStartY: yInversed ? crop.y + crop.height : crop.y,
	        xInversed: xInversed,
	        yInversed: yInversed,
	        xCrossOver: xInversed,
	        yCrossOver: yInversed,
	        startXCrossOver: xInversed,
	        startYCrossOver: yInversed,
	        isResize: e.target !== this.cropSelectRef,
	        ord: ord,
	        cropOffset: cropOffset
	      };

	      this.mouseDownOnCrop = true;
	    }
	  }, {
	    key: 'onComponentMouseTouchDown',
	    value: function onComponentMouseTouchDown(e) {
	      if (e.target !== this.imageCanvasRef && e.target !== this.cropWrapperRef && e.target !== this.eventTargetRef) {
	        return;
	      }

	      if (this.props.disabled) {
	        return;
	      }

	      e.preventDefault(); // Stop drag selection.

	      if (this.state.mode === 'pan') {
	        this.onPanMouseTouchDown(e);
	        return;
	      }

	      var crop = this.props.keepSelection === true ? {} : this.state.crop;
	      var clientPos = this.getClientPos(e);

	      // Focus for detecting keypress.
	      this.componentRef.focus();

	      var imageOffset = this.getElementOffset(this.imageRef);
	      var xPc = (clientPos.x - imageOffset.left) / imageOffset.width * 100;
	      var yPc = (clientPos.y - imageOffset.top) / imageOffset.height * 100;

	      crop.x = xPc;
	      crop.y = yPc;
	      crop.width = 0;
	      crop.height = 0;

	      this.evData = {
	        imageWidth: this.imageRef.width,
	        imageHeight: this.imageRef.height,
	        clientStartX: clientPos.x,
	        clientStartY: clientPos.y,
	        cropStartWidth: crop.width,
	        cropStartHeight: crop.height,
	        cropStartX: crop.x,
	        cropStartY: crop.y,
	        xInversed: false,
	        yInversed: false,
	        xCrossOver: false,
	        yCrossOver: false,
	        startXCrossOver: false,
	        startYCrossOver: false,
	        isResize: true,
	        ord: 'nw'
	      };

	      this.mouseDownOnCrop = true;
	      this.setState({ newCropIsBeingDrawn: true });
	    }
	  }, {
	    key: 'onComponentKeyDown',
	    value: function onComponentKeyDown(e) {
	      var _this3 = this;

	      if (e.key === 'Escape') {
	        var _crop = { x: 0, y: 0, width: 100, height: 100 };
	        var zoomedCrop = this.zoomCrop(_crop);
	        this.setState({ crop: _crop });
	        if (this.props.onComplete) {
	          this.props.onComplete(_crop, this.getPixelCrop(_crop), zoomedCrop);
	        }
	        return;
	      }
	      if (this.props.disabled) {
	        return;
	      }

	      var keyCode = e.which;
	      var crop = this.state.crop;

	      var nudged = false;

	      if (!crop.width || !crop.height) {
	        return;
	      }

	      if (keyCode === ReactCrop.arrowKey.left) {
	        crop.x -= ReactCrop.nudgeStep;
	        nudged = true;
	      } else if (keyCode === ReactCrop.arrowKey.right) {
	        crop.x += ReactCrop.nudgeStep;
	        nudged = true;
	      } else if (keyCode === ReactCrop.arrowKey.up) {
	        crop.y -= ReactCrop.nudgeStep;
	        nudged = true;
	      } else if (keyCode === ReactCrop.arrowKey.down) {
	        crop.y += ReactCrop.nudgeStep;
	        nudged = true;
	      }

	      if (nudged) {
	        e.preventDefault(); // Stop drag selection.
	        crop.x = this.clamp(crop.x, 0, 100 - crop.width);
	        crop.y = this.clamp(crop.y, 0, 100 - crop.height);

	        this.setState({ crop: crop }, function () {
	          var zoomedCrop = _this3.zoomCrop(crop);
	          if (_this3.props.onChange) {
	            _this3.props.onChange(crop, _this3.getPixelCrop(crop), zoomedCrop, _this3.getPixelCrop(zoomedCrop));
	          }
	          if (_this3.props.onComplete) {
	            _this3.props.onComplete(crop, _this3.getPixelCrop(crop), zoomedCrop);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'onDocMouseTouchEnd',
	    value: function onDocMouseTouchEnd(e) {
	      if (this.props.disabled) {
	        return;
	      }

	      if (this.state.mode === 'pan') {
	        this.onPanMouseTouchEnd(e);
	        return;
	      }

	      if (this.mouseDownOnCrop) {
	        var crop = this.state.crop;

	        this.cropInvalid = this.isCropInvalid(crop);
	        this.mouseDownOnCrop = false;

	        if (this.props.onComplete) {
	          var crop2 = Object.assign({}, crop);
	          if (!crop2.width) {
	            crop2.x = 0;
	            crop2.y = 0;
	            crop2.width = 100;
	            crop2.height = 100;
	          }
	          var zoomedCrop = this.zoomCrop(crop2);
	          this.props.onComplete(crop2, this.getPixelCrop(crop2), zoomedCrop);
	        }

	        this.setState({ newCropIsBeingDrawn: false });
	      }
	    }
	  }, {
	    key: 'onPanMouseTouchDown',
	    value: function onPanMouseTouchDown(e) {
	      this.isPanning = true;
	      this.panInitialState = this.panPosition ? _extends({}, this.panPosition) : { x: 0, y: 0 };
	      this.panStartPosition = { x: e.clientX, y: e.clientY };
	    }
	  }, {
	    key: 'onPanMouseTouchEnd',
	    value: function onPanMouseTouchEnd(e) {
	      this.isPanning = false;
	      if (this.props.onComplete) {
	        var crop = this.state.crop;

	        var zoomedCrop = this.zoomCrop(crop);
	        if (this.props.onComplete) {
	          this.props.onComplete(crop, this.getPixelCrop(crop), zoomedCrop);
	        }
	      }
	    }
	  }, {
	    key: 'onPanMouseMove',
	    value: function onPanMouseMove(e) {
	      if (this.state.mode !== 'pan') return;
	      if (!this.isPanning) return;
	      var diffX = e.clientX - this.panStartPosition.x;
	      var diffY = e.clientY - this.panStartPosition.y;
	      this.panPosition = {
	        x: this.panInitialState.x + diffX,
	        y: this.panInitialState.y + diffY
	      };
	      this.renderCanvases();
	    }
	  }, {
	    key: 'getPixelCrop',
	    value: function getPixelCrop(crop) {
	      return {
	        x: Math.round(this.imageRef.naturalWidth * (crop.x / 100)),
	        y: Math.round(this.imageRef.naturalHeight * (crop.y / 100)),
	        width: Math.round(this.imageRef.naturalWidth * (crop.width / 100)),
	        height: Math.round(this.imageRef.naturalHeight * (crop.height / 100))
	      };
	    }
	  }, {
	    key: 'getPolygonValues',
	    value: function getPolygonValues(forSvg) {
	      var crop = this.state.crop;

	      var pTopLeft = [crop.x, crop.y];
	      var pTopRight = [crop.x + crop.width, crop.y];
	      var pBottomLeft = [crop.x, crop.y + crop.height];
	      var pBottomRight = [crop.x + crop.width, crop.y + crop.height];

	      if (forSvg) {
	        pTopLeft = this.arrayDividedBy100(pTopLeft);
	        pTopRight = this.arrayDividedBy100(pTopRight);
	        pBottomLeft = this.arrayDividedBy100(pBottomLeft);
	        pBottomRight = this.arrayDividedBy100(pBottomRight);
	      } else {
	        pTopLeft = this.arrayToPercent(pTopLeft);
	        pTopRight = this.arrayToPercent(pTopRight);
	        pBottomLeft = this.arrayToPercent(pBottomLeft);
	        pBottomRight = this.arrayToPercent(pBottomRight);
	      }
	      return {
	        top: {
	          left: pTopLeft,
	          right: pTopRight
	        },
	        bottom: {
	          left: pBottomLeft,
	          right: pBottomRight
	        }
	      };
	    }
	  }, {
	    key: 'getCropStyle',
	    value: function getCropStyle() {
	      return {
	        top: this.state.crop.y + '%',
	        left: this.state.crop.x + '%',
	        width: this.state.crop.width + '%',
	        height: this.state.crop.height + '%'
	      };
	    }
	  }, {
	    key: 'getEllipseValues',
	    value: function getEllipseValues(forSvg) {
	      var crop = this.state.crop;

	      var rx = crop.width / 2;
	      var ry = crop.height / 2;
	      var cx = crop.x + rx;
	      var cy = crop.y + ry;

	      if (forSvg) {
	        rx /= 100;
	        ry /= 100;
	        cx /= 100;
	        cy /= 100;
	      } else {
	        rx += '%';
	        ry += '%';
	        cx += '%';
	        cy += '%';
	      }
	      return { cx: cx, cy: cy, rx: rx, ry: ry };
	    }
	  }, {
	    key: 'getPolygonClipPath',
	    value: function getPolygonClipPath() {
	      var _getPolygonValues = this.getPolygonValues(),
	          top = _getPolygonValues.top,
	          bottom = _getPolygonValues.bottom;

	      return 'polygon(' + top.left + ', ' + top.right + ', ' + bottom.right + ', ' + bottom.left + ')';
	    }
	  }, {
	    key: 'getEllipseClipPath',
	    value: function getEllipseClipPath() {
	      var _getEllipseValues = this.getEllipseValues(),
	          rx = _getEllipseValues.rx,
	          ry = _getEllipseValues.ry,
	          cx = _getEllipseValues.cx,
	          cy = _getEllipseValues.cy;

	      return 'ellipse(' + rx + ' ' + ry + ' at ' + cx + ' ' + cy + ')';
	    }
	  }, {
	    key: 'getElementOffset',
	    value: function getElementOffset(el) {
	      var rect = el.getBoundingClientRect();
	      var docEl = document.documentElement;

	      var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
	      var rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;

	      return {
	        top: rectTop,
	        left: rectLeft,
	        width: rect.right - rect.left,
	        height: rect.bottom - rect.top
	      };
	    }
	  }, {
	    key: 'getClientPos',
	    value: function getClientPos(e) {
	      var pageX = void 0;
	      var pageY = void 0;

	      if (e.touches) {
	        pageX = e.touches[0].pageX;
	        pageY = e.touches[0].pageY;
	      } else {
	        pageX = e.pageX;
	        pageY = e.pageY;
	      }

	      return {
	        x: pageX,
	        y: pageY
	      };
	    }
	  }, {
	    key: 'getNewSize',
	    value: function getNewSize() {
	      var crop = this.state.crop;

	      var evData = this.evData;
	      var imageAspect = evData.imageWidth / evData.imageHeight;

	      // New width.
	      var newWidth = evData.cropStartWidth + evData.xDiffPc;

	      if (evData.xCrossOver) {
	        newWidth = Math.abs(newWidth);
	      }

	      var maxWidth = this.props.maxWidth;

	      // Stop the box expanding on the opposite side when some edges are hit.
	      if (!this.state.newCropIsBeingDrawn) {
	        maxWidth = ['nw', 'w', 'sw'].indexOf(evData.inversedXOrd || evData.ord) > -1 ? evData.cropStartX : 100 - evData.cropStartX;
	        maxWidth = this.clamp(maxWidth, 100, this.props.maxWidth);
	      }

	      newWidth = this.clamp(newWidth, this.props.minWidth || 0, maxWidth);

	      // New height.
	      var newHeight = void 0;

	      if (crop.aspect) {
	        newHeight = newWidth / crop.aspect * imageAspect;
	      } else {
	        newHeight = evData.cropStartHeight + evData.yDiffPc;
	      }

	      if (evData.yCrossOver) {
	        // Cap if polarity is inversed and the ape fills the y space.
	        newHeight = Math.min(Math.abs(newHeight), evData.cropStartY);
	      }

	      var maxHeight = this.props.maxHeight;

	      // Stop the box expanding on the opposite side when some edges are hit.
	      if (!this.state.newCropIsBeingDrawn) {
	        maxHeight = ['nw', 'n', 'ne'].indexOf(evData.inversedYOrd || evData.ord) > -1 ? evData.cropStartY : 100 - evData.cropStartY;
	        maxHeight = this.clamp(maxHeight, 100, this.props.maxHeight);
	      }

	      newHeight = this.clamp(newHeight, this.props.minHeight || 0, maxHeight);

	      if (crop.aspect) {
	        newWidth = this.clamp(newHeight * crop.aspect / imageAspect, 0, 100);
	      }

	      return {
	        width: newWidth,
	        height: newHeight
	      };
	    }
	  }, {
	    key: 'getRandomInt',
	    value: function getRandomInt(min, max) {
	      return Math.floor(Math.random() * (max - min + 1)) + min;
	    }
	  }, {
	    key: 'getPolygonId',
	    value: function getPolygonId() {
	      return 'ReactCropClipPolygon-' + this.state.polygonId;
	    }
	  }, {
	    key: 'dragCrop',
	    value: function dragCrop() {
	      var crop = this.state.crop;

	      var evData = this.evData;
	      crop.x = this.clamp(evData.cropStartX + evData.xDiffPc, 0, 100 - crop.width);
	      crop.y = this.clamp(evData.cropStartY + evData.yDiffPc, 0, 100 - crop.height);
	    }
	  }, {
	    key: 'resizeCrop',
	    value: function resizeCrop() {
	      var crop = this.state.crop;

	      var evData = this.evData;
	      var ord = evData.ord;

	      // On the inverse change the diff so it's the same and
	      // the same algo applies.
	      if (evData.xInversed) {
	        evData.xDiffPc -= evData.cropStartWidth * 2;
	      }
	      if (evData.yInversed) {
	        evData.yDiffPc -= evData.cropStartHeight * 2;
	      }

	      // New size.
	      var newSize = this.getNewSize();

	      // Adjust x/y to give illusion of 'staticness' as width/height is increased
	      // when polarity is inversed.
	      var newX = evData.cropStartX;
	      var newY = evData.cropStartY;

	      if (evData.xCrossOver) {
	        newX = crop.x + (crop.width - newSize.width);
	      }

	      if (evData.yCrossOver) {
	        // This not only removes the little "shake" when inverting at a diagonal, but for some
	        // reason y was way off at fast speeds moving sw->ne with fixed aspect only, I couldn't
	        // figure out why.
	        if (evData.lastYCrossover === false) {
	          newY = crop.y - newSize.height;
	        } else {
	          newY = crop.y + (crop.height - newSize.height);
	        }
	      }

	      // Apply x/y/width/height changes depending on ordinate (fixed aspect always applies both).
	      if (crop.aspect || ReactCrop.xyOrds.indexOf(ord) > -1) {
	        crop.x = this.clamp(newX, 0, 100 - newSize.width);
	        crop.y = this.clamp(newY, 0, 100 - newSize.height);

	        crop.width = newSize.width;
	        crop.height = newSize.height;
	      } else if (ReactCrop.xOrds.indexOf(ord) > -1) {
	        crop.x = this.clamp(newX, 0, 100 - newSize.width);
	        crop.width = newSize.width;
	      } else if (ReactCrop.yOrds.indexOf(ord) > -1) {
	        crop.y = this.clamp(newY, 0, 100 - newSize.height);
	        crop.height = newSize.height;
	      }

	      evData.lastYCrossover = evData.yCrossOver;
	      this.crossOverCheck();
	    }
	  }, {
	    key: 'straightenYPath',
	    value: function straightenYPath(clientX) {
	      var evData = this.evData;
	      var ord = evData.ord;
	      var cropOffset = evData.cropOffset;
	      var cropStartWidth = evData.cropStartWidth / 100 * evData.imageWidth;
	      var cropStartHeight = evData.cropStartHeight / 100 * evData.imageHeight;
	      var k = void 0;
	      var d = void 0;

	      if (ord === 'nw' || ord === 'se') {
	        k = cropStartHeight / cropStartWidth;
	        d = cropOffset.top - cropOffset.left * k;
	      } else {
	        k = -cropStartHeight / cropStartWidth;
	        d = cropOffset.top + (cropStartHeight - cropOffset.left * k);
	      }

	      return k * clientX + d;
	    }
	  }, {
	    key: 'onImageLoad',
	    value: function onImageLoad(imageEl) {
	      var crop = this.state.crop;

	      this.imageCanvasRef.width = imageEl.naturalWidth;
	      this.imageCanvasRef.height = imageEl.naturalHeight;
	      this.imageCanvasRefBackground.width = imageEl.naturalWidth;
	      this.imageCanvasRefBackground.height = imageEl.naturalHeight;
	      this.renderCanvases();

	      // If there is a width or height then infer the other to
	      // ensure the value is correct.
	      if (crop.aspect) {
	        crop = this.ensureAspectDimensions(crop, imageEl);
	        this.cropInvalid = this.isCropInvalid(crop);
	        this.setState({ crop: crop });
	      }
	      if (this.props.onImageLoaded) {
	        this.props.onImageLoaded(crop, imageEl, this.getPixelCrop(crop));
	      }
	    }
	  }, {
	    key: 'onWheel',
	    value: function onWheel(event) {
	      var _this4 = this;

	      event.preventDefault();
	      var speed = -0.005;
	      var delta = speed;
	      if (event.deltaMode === 0) {
	        delta = event.deltaY * speed;
	      }

	      // don't zoom out past 1
	      var zoom = this.state.zoom + delta < 1 ? 1 : this.state.zoom + delta;

	      if (this.state.zoom !== zoom) {
	        this.setState({ zoom: zoom }, function () {
	          _this4.drawOnCanvas(_this4.imageCanvasRef);
	          _this4.drawOnCanvas(_this4.imageCanvasRefBackground);
	          var crop = _this4.state.crop;

	          var zoomedCrop = _this4.zoomCrop(crop);
	          if (_this4.props.onComplete) {
	            _this4.props.onComplete(crop, _this4.getPixelCrop(crop), zoomedCrop);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'onMouseOver',
	    value: function onMouseOver(event) {
	      window.addEventListener('scroll', this.onWindowScroll, false);
	    }
	  }, {
	    key: 'onMouseOut',
	    value: function onMouseOut(event) {
	      window.removeEventListener('scroll', this.onWindowScroll, false);
	    }

	    // this only runs when the mouse is over the canvas

	  }, {
	    key: 'onWindowScroll',
	    value: function onWindowScroll(event) {
	      event.preventDefault();
	    }
	  }, {
	    key: 'zoomCrop',
	    value: function zoomCrop(crop) {
	      crop = this.getPixelCrop(crop);
	      var _panPosition = this.panPosition,
	          panPosition = _panPosition === undefined ? { x: 0, y: 0 } : _panPosition;
	      var zoom = this.state.zoom;

	      var image = this.imageRef;
	      var imageWidth = image.naturalWidth,
	          imageHeight = image.naturalHeight;


	      var pin = { x: crop.x, y: crop.y };
	      var z = zoom;
	      var xnl = imageWidth * z;
	      var ynl = imageHeight * z;
	      var dx = (xnl - imageWidth) / 2;
	      var dy = (ynl - imageHeight) / 2;
	      var xnc = crop.x + dx;
	      var ync = crop.y + dy;
	      var xc = xnc / z;
	      var yc = ync / z;
	      var x = xc - panPosition.x;
	      var y = yc - panPosition.y;
	      var width = crop.width / zoom;
	      var height = crop.height / zoom;
	      return { x: x, y: y, width: width, height: height, aspect: crop.aspect };
	    }
	  }, {
	    key: 'renderCanvases',
	    value: function renderCanvases() {
	      this.drawOnCanvas(this.imageCanvasRef);
	      this.drawOnCanvas(this.imageCanvasRefBackground);
	    }
	  }, {
	    key: 'drawOnCanvas',
	    value: function drawOnCanvas(canvasElement) {
	      var img = this.imageRef;
	      var zoom = this.state.zoom;
	      var naturalWidth = img.naturalWidth,
	          naturalHeight = img.naturalHeight;
	      var _panPosition2 = this.panPosition,
	          panPosition = _panPosition2 === undefined ? { x: 0, y: 0 } : _panPosition2;

	      var ctx = canvasElement.getContext('2d');

	      var width = naturalWidth;
	      var height = naturalHeight;
	      var xOffset = width / 2;
	      var yOffset = height / 2;

	      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
	      ctx.save();
	      ctx.translate(xOffset, yOffset);
	      ctx.scale(zoom, zoom);

	      ctx.drawImage(this.imageRef, -xOffset + panPosition.x, -yOffset + panPosition.y, canvasElement.width, canvasElement.height);
	      ctx.restore();
	    }
	  }, {
	    key: 'arrayDividedBy100',
	    value: function arrayDividedBy100(arr) {
	      var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

	      return arr.map(function (number) {
	        return number / 100;
	      }).join(delimeter);
	    }
	  }, {
	    key: 'arrayToPercent',
	    value: function arrayToPercent(arr) {
	      var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

	      return arr.map(function (number) {
	        return number + '%';
	      }).join(delimeter);
	    }
	  }, {
	    key: 'createCropSelection',
	    value: function createCropSelection() {
	      var _this5 = this;

	      var style = this.getCropStyle();
	      var aspect = this.state.crop.aspect;
	      var ellipse = this.props.ellipse;


	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(c) {
	            _this5.cropSelectRef = c;
	          },
	          style: style,
	          className: 'ReactCrop--crop-selection',
	          onMouseDown: this.onCropMouseTouchDown,
	          onTouchStart: this.onCropMouseTouchDown
	        },
	        _react2.default.createElement('div', { className: 'ReactCrop--drag-bar ord-n', 'data-ord': 'n' }),
	        _react2.default.createElement('div', { className: 'ReactCrop--drag-bar ord-e', 'data-ord': 'e' }),
	        _react2.default.createElement('div', { className: 'ReactCrop--drag-bar ord-s', 'data-ord': 's' }),
	        _react2.default.createElement('div', { className: 'ReactCrop--drag-bar ord-w', 'data-ord': 'w' }),
	        ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-nw', 'data-ord': 'nw' }),
	        aspect && !ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-n', 'data-ord': 'n' }),
	        ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-ne', 'data-ord': 'ne' }),
	        aspect && !ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-e', 'data-ord': 'e' }),
	        ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-se', 'data-ord': 'se' }),
	        aspect && !ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-s', 'data-ord': 's' }),
	        ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-sw', 'data-ord': 'sw' }),
	        aspect && !ellipse ? null : _react2.default.createElement('div', { className: 'ReactCrop--drag-handle ord-w', 'data-ord': 'w' })
	      );
	    }
	  }, {
	    key: 'isCropInvalid',
	    value: function isCropInvalid(crop) {
	      return !crop.width || !crop.height;
	    }
	  }, {
	    key: 'nextCropState',
	    value: function nextCropState(crop) {
	      var nextCrop = (0, _objectAssign2.default)({}, ReactCrop.defaultCrop, crop);
	      this.cropInvalid = this.isCropInvalid(nextCrop);
	      return nextCrop;
	    }
	  }, {
	    key: 'clamp',
	    value: function clamp(num, min, max) {
	      return Math.min(Math.max(num, min), max);
	    }
	  }, {
	    key: 'crossOverCheck',
	    value: function crossOverCheck() {
	      var evData = this.evData;

	      if (!evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiffPc >= 0 || evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiffPc <= 0) {
	        evData.xCrossOver = !evData.xCrossOver;
	      }

	      if (!evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiffPc >= 0 || evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiffPc <= 0) {
	        evData.yCrossOver = !evData.yCrossOver;
	      }

	      var swapXOrd = evData.xCrossOver !== evData.startXCrossOver;
	      var swapYOrd = evData.yCrossOver !== evData.startYCrossOver;

	      evData.inversedXOrd = swapXOrd ? this.inverseOrd(evData.ord) : false;
	      evData.inversedYOrd = swapYOrd ? this.inverseOrd(evData.ord) : false;
	    }
	  }, {
	    key: 'inverseOrd',
	    value: function inverseOrd(ord) {
	      var inverseOrd = void 0;

	      if (ord === 'n') inverseOrd = 's';else if (ord === 'ne') inverseOrd = 'sw';else if (ord === 'e') inverseOrd = 'w';else if (ord === 'se') inverseOrd = 'nw';else if (ord === 's') inverseOrd = 'n';else if (ord === 'sw') inverseOrd = 'ne';else if (ord === 'w') inverseOrd = 'e';else if (ord === 'nw') inverseOrd = 'se';

	      return inverseOrd;
	    }
	  }, {
	    key: 'ensureAspectDimensions',
	    value: function ensureAspectDimensions(cropObj, imageEl) {
	      var imageWidth = imageEl.naturalWidth;
	      var imageHeight = imageEl.naturalHeight;
	      var imageAspect = imageWidth / imageHeight;
	      var crop = (0, _objectAssign2.default)({}, cropObj);

	      if (crop.width) {
	        crop.height = crop.width / crop.aspect * imageAspect;
	      } else if (crop.height) {
	        crop.width = crop.height * crop.aspect / imageAspect;
	      }

	      if (crop.y + crop.height > 100) {
	        crop.height = 100 - crop.y;
	        crop.width = crop.height * crop.aspect / imageAspect;
	      }
	      if (crop.x + crop.width > 100) {
	        crop.width = 100 - crop.x;
	        crop.height = crop.width / crop.aspect * imageAspect;
	      }

	      return crop;
	    }

	    // Unfortunately some modern browsers like Firefox still don't support svg's as a css property..

	  }, {
	    key: 'renderSvg',
	    value: function renderSvg() {
	      var shape = void 0;
	      if (this.props.ellipse) {
	        shape = _react2.default.createElement('ellipse', this.getEllipseValues(true));
	      } else {
	        var _getPolygonValues2 = this.getPolygonValues(true),
	            top = _getPolygonValues2.top,
	            bottom = _getPolygonValues2.bottom;

	        shape = _react2.default.createElement('polygon', { points: top.left + ', ' + top.right + ', ' + bottom.right + ', ' + bottom.left });
	      }

	      return _react2.default.createElement(
	        'svg',
	        { width: '0', height: '0', style: { position: 'absolute' } },
	        _react2.default.createElement(
	          'defs',
	          null,
	          _react2.default.createElement(
	            'clipPath',
	            { id: this.getPolygonId(), clipPathUnits: 'objectBoundingBox' },
	            shape
	          )
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      var cropSelection = void 0;
	      var imageClip = void 0;
	      var isDataUrl = this.props.src.indexOf('data:') === 0;

	      if (!this.cropInvalid) {
	        cropSelection = this.createCropSelection();
	        imageClip = {
	          WebkitClipPath: this.props.ellipse ? this.getEllipseClipPath() : this.getPolygonClipPath(),
	          clipPath: 'url("#' + this.getPolygonId() + '")'
	        };
	      }

	      var componentClasses = ['ReactCrop'];

	      if (this.state.newCropIsBeingDrawn) {
	        componentClasses.push('ReactCrop-new-crop');
	      }
	      if (this.state.crop.aspect) {
	        componentClasses.push('ReactCrop-fixed-aspect');
	      }
	      if (this.props.ellipse) {
	        componentClasses.push('ReactCrop-ellipse');
	      }
	      if (this.props.disabled) {
	        componentClasses.push('ReactCrop--disabled');
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(c) {
	            _this6.componentRef = c;
	          },
	          className: componentClasses.join(' '),
	          onTouchStart: this.onComponentMouseTouchDown,
	          onMouseDown: this.onComponentMouseTouchDown,
	          tabIndex: '1',
	          onKeyDown: this.onComponentKeyDown,
	          style: { position: 'relative' }
	        },
	        this.renderSvg(),
	        _react2.default.createElement('img', {
	          ref: function ref(c) {
	            _this6.imageRef = c;
	          },
	          crossOrigin: isDataUrl ? undefined : this.props.crossorigin,
	          className: 'ReactCrop--image',
	          src: this.props.src,
	          onLoad: function onLoad(e) {
	            return _this6.onImageLoad(e.target);
	          },
	          alt: ''
	        }),
	        _react2.default.createElement(
	          'div',
	          {
	            className: 'ReactCrop--crop-wrapper',
	            ref: function ref(c) {
	              _this6.cropWrapperRef = c;
	            }
	          },
	          _react2.default.createElement('canvas', {
	            width: '1',
	            height: '1',
	            ref: function ref(c) {
	              _this6.imageCanvasRefBackground = c;
	            },
	            className: 'ReactCrop--image-copy'
	          }),
	          _react2.default.createElement('div', { className: 'ReactCrop--background' }),
	          _react2.default.createElement('canvas', {
	            width: '1',
	            height: '1',
	            ref: function ref(c) {
	              _this6.imageCanvasRef = c;
	            },
	            className: 'ReactCrop--image-copy',
	            style: imageClip
	          }),
	          cropSelection
	        ),
	        _react2.default.createElement('div', {
	          className: 'ReactCrop--event-target ReactCrop--event-target--' + this.state.mode,
	          onWheel: this.onWheel,
	          onMouseOver: this.onMouseOver,
	          onMouseOut: this.onMouseOut,
	          onMouseMove: this.onPanMouseMove,
	          ref: function ref(_ref) {
	            return _this6.eventTargetRef = _ref;
	          }
	        }),
	        this.props.children,
	        _react2.default.createElement(
	          'div',
	          { style: _extends({ position: 'absolute', bottom: '3px', right: '3px' }, this.props.buttonContainerStyle) },
	          this.renderModeButtons()
	        )
	      );
	    }
	  }, {
	    key: 'renderModeButtons',
	    value: function renderModeButtons() {
	      var _this7 = this;

	      var mode = this.state.mode;

	      var buttonStyle = {
	        display: 'inline-block',
	        padding: '0.25em 0.5em',
	        marginLeft: '3px',
	        background: 'white',
	        color: '#444',
	        fontFamily: 'Arial',
	        textAlign: 'center',
	        cursor: 'pointer'
	      };

	      var inactiveOpacity = '0.75';
	      var cropButtonStyle = _extends({}, buttonStyle, {
	        opacity: inactiveOpacity
	      });
	      var panButtonStyle = _extends({}, buttonStyle, {
	        opacity: inactiveOpacity
	      });

	      if (mode === 'crop') cropButtonStyle.opacity = '1';
	      if (mode === 'pan') panButtonStyle.opacity = '1';

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { style: cropButtonStyle, onClick: function onClick() {
	              return _this7.setState({ mode: 'crop' });
	            } },
	          'Crop'
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: panButtonStyle, onClick: function onClick() {
	              return _this7.setState({ mode: 'pan' });
	            } },
	          'Pan'
	        )
	      );
	    }
	  }]);

	  return ReactCrop;
	}(_react.Component);

	ReactCrop.propTypes = {
	  src: _react.PropTypes.string.isRequired,
	  crop: _react.PropTypes.object,
	  minWidth: _react.PropTypes.number,
	  minHeight: _react.PropTypes.number,
	  maxWidth: _react.PropTypes.number,
	  maxHeight: _react.PropTypes.number,
	  keepSelection: _react.PropTypes.bool,
	  onChange: _react.PropTypes.func,
	  onComplete: _react.PropTypes.func,
	  onImageLoaded: _react.PropTypes.func,
	  onAspectRatioChange: _react.PropTypes.func,
	  disabled: _react.PropTypes.bool,
	  ellipse: _react.PropTypes.bool,
	  crossorigin: _react.PropTypes.string,
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  buttonContainerStyle: _react2.default.PropTypes.object
	};
	ReactCrop.defaultProps = {
	  disabled: false,
	  maxWidth: 100,
	  maxHeight: 100,
	  crossorigin: 'anonymous'
	};
	ReactCrop.xOrds = ['e', 'w'];
	ReactCrop.yOrds = ['n', 's'];
	ReactCrop.xyOrds = ['nw', 'ne', 'se', 'sw'];
	ReactCrop.arrowKey = {
	  left: 37,
	  up: 38,
	  right: 39,
	  down: 40
	};
	ReactCrop.nudgeStep = 0.2;
	ReactCrop.defaultCrop = {
	  x: 0,
	  y: 0,
	  width: 0,
	  height: 0,
	  aspect: false
	};


	module.exports = ReactCrop;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("object-assign");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var debounce = __webpack_require__(4),
	    isObject = __webpack_require__(5);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	module.exports = throttle;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(5),
	    now = __webpack_require__(6),
	    toNumber = __webpack_require__(9);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(7);

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	module.exports = now;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(8);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(5),
	    isSymbol = __webpack_require__(10);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(11),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12),
	    getRawTag = __webpack_require__(13),
	    objectToString = __webpack_require__(14);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(7);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(12);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vector = __webpack_require__(17)
	  , Float32Vector = __webpack_require__(18)
	  , ObjectVector = __webpack_require__(23);

	module.exports = {
	  ArrayVector: Vector,
	  ObjectVector: ObjectVector,
	  Float32Vector: Float32Vector

	  // TODO: Add instance methods in the future
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Primary Vector class. Uses Array type for axis storage.
	 * @class Vector
	 * @param {Number} x The x component of this Vector
	 * @param {Number} y The y component of this Vector
	 */
	function Vector(x, y) {
	  if (this instanceof Vector === false) {
	    return new Vector(x, y);
	  }

	  this._axes = [x, y];
	}
	module.exports = Vector;

	var precision = [
	  1,
	  10,
	  100,
	  1000,
	  10000,
	  100000,
	  1000000,
	  10000000,
	  100000000,
	  1000000000,
	  10000000000
	];

	Vector.prototype = {
	  ctor: Vector,

	  /**
	   * Set both x and y
	   * @param x   New x val
	   * @param y   New y val
	   */
	  setAxes: function(x, y) {
	    this.x = x;
	    this.y = y;
	    return this;
	  },


	  /**
	   * Getter for x axis.
	   * @return {Number}
	   */
	  getX: function() {
	    return this.x;
	  },


	  /**
	   * Setter for x axis.
	   */
	  setX: function(x) {
	    this.x = x;

	    return this;
	  },


	  /**
	   * Getter for y axis.
	   * @return {Number}
	   */
	  getY: function() {
	    return this.y;
	  },


	  /**
	   * Setter for y axis.
	   */
	  setY: function(y) {
	    this.y = y;

	    return this;
	  },


	  /**
	   * View vector as a string such as "Vec2D: (0, 4)"
	   * @param   {Boolean}
	   * @return  {String}
	   */
	  toString: function(round) {
	    if (round) {
	      return '(' + Math.round(this.x) +
	        ', ' + Math.round(this.y) + ')';
	    }
	    return '(' + this.x + ', ' + this.y + ')';
	  },


	  /**
	   * Return an array containing the vector axes.
	   * @return {Array}
	   */
	  toArray: function() {
	    return new Array(this.x, this.y);
	  },


	  /**
	   * Return an array containing the vector axes.
	   * @return {Object}
	   */
	  toObject: function() {
	    return {
	      x: this.x,
	      y: this.y
	    };
	  },


	  /**
	   * Add the provided Vector to this one.
	   * @param {Vector} vec
	   */
	  add: function(vec) {
	    this.x += vec.x;
	    this.y += vec.y;
	    return this;
	  },


	  /**
	   * Subtract the provided vector from this one.
	   * @param {Vector} vec
	   */
	  subtract: function(vec) {
	    this.x -= vec.x;
	    this.y -= vec.y;
	    return this;
	  },


	  /**
	   * Check is the vector provided equal to this one.
	   * @param   {Vec2D}   vec
	   * @return  {Boolean}
	   */
	  equals: function(vec) {
	    return (vec.x == this.x && vec.y == this.y);
	  },


	  /**
	   * Multiply this vector by the provided vector.
	   * @param {Vector} vec
	   */
	  multiplyByVector: function(vec) {
	    this.x *= vec.x;
	    this.y *= vec.y;
	    return this;
	  },
	  mulV: function(v) {
	    return this.multiplyByVector(v);
	  },


	  /**
	   * Multiply this vector by the provided vector.
	   * @param {Vector} vec
	   */
	  divideByVector: function(vec) {
	    this.x /= vec.x;
	    this.y /= vec.y;
	    return this;
	  },
	  divV: function(v) {
	    return this.divideByVector(v);
	  },


	  /**
	   * Multiply this vector by the provided number
	   * @param {Number} n
	   */
	  multiplyByScalar: function(n) {
	    this.x *= n;
	    this.y *= n;

	    return this;
	  },
	  mulS: function(n) {
	    return this.multiplyByScalar(n);
	  },


	  /**
	   * Divive this vector by the provided number
	   * @param {Number} n
	   */
	  divideByScalar: function(n) {
	    this.x /= n;
	    this.y /= n;
	    return this;
	  },
	  divS: function(n) {
	    return this.divideByScalar(n);
	  },


	  /**
	   * Normalise this vector. Directly affects this vector.
	   * Use Vec2D.normalise(vector) to create a normalised clone of this.
	   */
	  normalise: function() {
	    return this.divideByScalar(this.magnitude());
	  },


	  /**
	   * For American spelling.
	   * Same as unit/normalise function.
	   */
	  normalize: function() {
	    return this.normalise();
	  },


	  /**
	   * The same as normalise.
	   */
	  unit: function() {
	    return this.normalise();
	  },


	  /**
	   * Return the magnitude (length) of this vector.
	   * @return  {Number}
	   */
	  magnitude: function() {
	    var x = this.x,
	      y = this.y;

	    return Math.sqrt((x * x) + (y * y));
	  },


	  /**
	   * Return the magnitude (length) of this vector.
	   * @return  {Number}
	   */
	  length: function() {
	    return this.magnitude();
	  },


	  /**
	   * Return the squred length of a vector
	   * @return {Number}
	   */
	  lengthSq: function() {
	    var x = this.x,
	      y = this.y;

	    return (x * x) + (y * y);
	  },


	  /**
	   * Get the dot product of this vector by another.
	   * @param   {Vector} vec
	   * @return  {Number}
	   */
	  dot: function(vec) {
	    return (vec.x * this.x) + (vec.y * this.y);
	  },


	  /**
	   * Get the cross product of this vector by another.
	   * @param   {Vector} vec
	   * @return  {Number}
	   */
	  cross: function(vec) {
	    return ((this.x * vec.y) - (this.y * vec.x));
	  },


	  /**
	   * Reverses this vector.
	   */
	  reverse: function() {
	    this.x = -this.x;
	    this.y = -this.y;
	    return this;
	  },


	  /**
	   * Convert vector to absolute values.
	   * @param   {Vector} vec
	   */
	  abs: function() {
	    this.x = Math.abs(this.x);
	    this.y = Math.abs(this.y);

	    return this;
	  },


	  /**
	   * Zeroes the vector
	   * @return  {Vector}
	   */
	  zero: function() {
	    this.x = this.y = 0;
	    return this;
	  },


	  /**
	   * Distance between this vector and another.
	   * @param {Vector} v
	   */
	  distance: function (v) {
	    var x = this.x - v.x;
	    var y = this.y - v.y;

	    return Math.sqrt((x * x) + (y * y));
	  },


	  /**
	   * Rotate the vetor by provided radians.
	   * @param   {Number}  rads
	   * @return  {Vector}
	   */
	  rotate: function(rads) {
	    var cos = Math.cos(rads),
	      sin = Math.sin(rads);

	    var ox = this.x,
	      oy = this.y;

	    this.x = ox * cos - oy * sin;
	    this.y = ox * sin + oy * cos;

	    return this;
	  },


	  /**
	   * Round this vector to n decimal places
	   * @param {Number}  n
	   */
	  round: function(n) {
	    // Default is two decimals
	    n = n || 2;

	    var p = precision[n];

	    // This performs waaay better than toFixed and give Float32 the edge again.
	    // http://www.dynamicguru.com/javascript/round-numbers-with-precision/
	    this.x = ((0.5 + (this.x * p)) << 0) / p;
	    this.y = ((0.5 + (this.y * p)) << 0) / p;

	    return this;
	  },


	  /**
	   * Create a copy of this vector.
	   * @return {Vector}
	   */
	  clone: function() {
	    return new this.ctor(this.x, this.y);
	  }
	};

	Object.defineProperty(Vector.prototype, 'x', {
	  get: function () {
	    return this._axes[0];
	  },
	  set: function (x) {
	    this._axes[0] = x;
	  }
	});

	Object.defineProperty(Vector.prototype, 'y', {
	  get: function () {
	    return this._axes[1];
	  },
	  set: function (y) {
	    this._axes[1] = y;
	  }
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(19)
	  , Vector = __webpack_require__(17);

	function Float32Vector(x, y) {
	  if (this instanceof Float32Vector === false) {
	    return new Float32Vector(x, y);
	  }

	  this._axes = new Float32Array(2);
	  this._axes[0] = x;
	  this._axes[1] = y;
	}
	util.inherits(Float32Vector, Vector);

	Float32Vector.prototype.ctor = Float32Vector;

	module.exports = Float32Vector;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(21);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(22);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(20)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(19)
	  , Vector = __webpack_require__(17);

	function ObjectVector(x, y) {
	  if (this instanceof ObjectVector === false) {
	    return new ObjectVector(x, y);
	  }

	  this._x = x;
	  this._y = y;
	}
	util.inherits(ObjectVector, Vector);

	Object.defineProperty(ObjectVector.prototype, 'x', {
	  get: function () {
	    return this._x;
	  },
	  set: function (x) {
	    this._x = x;
	  }
	});

	Object.defineProperty(ObjectVector.prototype, 'y', {
	  get: function () {
	    return this._y;
	  },
	  set: function (y) {
	    this._y = y;
	  }
	});

	ObjectVector.prototype.ctor = ObjectVector;

	module.exports = ObjectVector;


/***/ }
/******/ ]);