'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Knob: {
    displayName: 'Knob'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'Knob.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'Knob.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Knob = _wrapComponent('Knob')((_temp = _class = function (_React$Component) {
  _inherits(Knob, _React$Component);

  function Knob(props) {
    _classCallCheck(this, Knob);

    var _this = _possibleConstructorReturn(this, (Knob.__proto__ || Object.getPrototypeOf(Knob)).call(this, props));

    _this.getArcToValue = function (v) {
      var startAngle = void 0;
      var endAngle = void 0;
      var angle = !_this.props.log ? (v - _this.props.min) * _this.angleArc / (_this.props.max - _this.props.min) : Math.log(Math.pow(v / _this.props.min, _this.angleArc)) / Math.log(_this.props.max / _this.props.min);
      if (!_this.props.clockwise) {
        startAngle = _this.endAngle + 0.00001;
        endAngle = startAngle - angle - 0.00001;
      } else {
        startAngle = _this.startAngle - 0.00001;
        endAngle = startAngle + angle + 0.00001;
      }
      if (_this.props.cursor) {
        startAngle = endAngle - _this.cursorExt;
        endAngle += _this.cursorExt;
      }
      return {
        startAngle: startAngle,
        endAngle: endAngle,
        acw: !_this.props.clockwise && !_this.props.cursor
      };
    };

    _this.getCanvasScale = function (ctx) {
      var devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || // IE10
      1;
      var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    };

    _this.coerceToStep = function (v) {
      var val = !_this.props.log ? ~~((v < 0 ? -0.5 : 0.5) + v / _this.props.step) * _this.props.step : Math.pow(_this.props.step, ~~((Math.abs(v) < 1 ? -0.5 : 0.5) + Math.log(v) / Math.log(_this.props.step)));
      val = Math.max(Math.min(val, _this.props.max), _this.props.min);
      if (isNaN(val)) {
        val = 0;
      }
      return Math.round(val * 1000) / 1000;
    };

    _this.eventToValue = function (e) {
      var bounds = _this.canvasRef.getBoundingClientRect();
      var x = e.clientX - bounds.left;
      var y = e.clientY - bounds.top;
      var a = Math.atan2(x - _this.w / 2, _this.w / 2 - y) - _this.angleOffset;
      if (!_this.props.clockwise) {
        a = _this.angleArc - a - 2 * Math.PI;
      }
      if (_this.angleArc !== Math.PI * 2 && a < 0 && a > -0.5) {
        a = 0;
      } else if (a < 0) {
        a += Math.PI * 2;
      }
      var val = !_this.props.log ? a * (_this.props.max - _this.props.min) / _this.angleArc + _this.props.min : Math.pow(_this.props.max / _this.props.min, a / _this.angleArc) * _this.props.min;
      return _this.coerceToStep(val);
    };

    _this.handleMouseDown = function (e) {
      _this.props.onChange(_this.eventToValue(e));
      document.addEventListener('mousemove', _this.handleMouseMove);
      document.addEventListener('mouseup', _this.handleMouseUp);
      document.addEventListener('keyup', _this.handleEsc);
    };

    _this.handleMouseMove = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.eventToValue(e));
    };

    _this.handleMouseUp = function (e) {
      _this.props.onChangeEnd(_this.eventToValue(e));
      document.removeEventListener('mousemove', _this.handleMouseMove);
      document.removeEventListener('mouseup', _this.handleMouseUp);
      document.removeEventListener('keyup', _this.handleEsc);
    };

    _this.handleTouchStart = function (e) {
      e.preventDefault();
      _this.touchIndex = e.targetTouches.length - 1;
      _this.props.onChange(_this.eventToValue(e.targetTouches[_this.touchIndex]));
      document.addEventListener('touchmove', _this.handleTouchMove, { passive: false });
      document.addEventListener('touchend', _this.handleTouchEnd);
      document.addEventListener('touchcancel', _this.handleTouchEnd);
    };

    _this.handleTouchMove = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.eventToValue(e.targetTouches[_this.touchIndex]));
    };

    _this.handleTouchEnd = function (e) {
      _this.props.onChangeEnd(_this.eventToValue(e));
      document.removeEventListener('touchmove', _this.handleTouchMove);
      document.removeEventListener('touchend', _this.handleTouchEnd);
      document.removeEventListener('touchcancel', _this.handleTouchEnd);
    };

    _this.handleEsc = function (e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        _this.handleMouseUp();
      }
    };

    _this.handleTextInput = function (e) {
      var val = Math.max(Math.min(+e.target.value, _this.props.max), _this.props.min) || _this.props.min;
      _this.props.onChange(val);
    };

    _this.handleWheel = function (e) {
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) {
        _this.props.onChange(_this.coerceToStep(!_this.props.log ? _this.props.value + _this.props.step : _this.props.value * _this.props.step));
      } else if (e.deltaX < 0 || e.deltaY < 0) {
        _this.props.onChange(_this.coerceToStep(!_this.props.log ? _this.props.value - _this.props.step : _this.props.value / _this.props.step));
      }
    };

    _this.handleArrowKey = function (e) {
      if (e.keyCode === 37 || e.keyCode === 40) {
        e.preventDefault();
        _this.props.onChange(_this.coerceToStep(!_this.props.log ? _this.props.value - _this.props.step : _this.props.value / _this.props.step));
      } else if (e.keyCode === 38 || e.keyCode === 39) {
        e.preventDefault();
        _this.props.onChange(_this.coerceToStep(!_this.props.log ? _this.props.value + _this.props.step : _this.props.value * _this.props.step));
      }
    };

    _this.inputStyle = function () {
      return {
        width: (_this.w / 2 + 4 >> 0) + 'px',
        height: (_this.w / 3 >> 0) + 'px',
        position: 'absolute',
        verticalAlign: 'middle',
        marginTop: (_this.w / 3 >> 0) + 'px',
        marginLeft: '-' + (_this.w * 3 / 4 + 2 >> 0) + 'px',
        border: 0,
        background: 'none',
        font: _this.props.fontWeight + ' ' + (_this.w / _this.digits >> 0) + 'px ' + _this.props.font,
        textAlign: 'center',
        color: _this.props.inputColor || _this.props.fgColor,
        padding: '0px',
        WebkitAppearance: 'none'
      };
    };

    _this.renderCenter = function () {
      var _this$props = _this.props,
          displayCustom = _this$props.displayCustom,
          displayInput = _this$props.displayInput,
          disableTextInput = _this$props.disableTextInput,
          readOnly = _this$props.readOnly,
          value = _this$props.value;


      if (displayInput) {
        return _react3.default.createElement('input', {
          style: _this.inputStyle(),
          type: 'text',
          value: value,
          onChange: _this.handleTextInput,
          onKeyDown: _this.handleArrowKey,
          readOnly: readOnly || disableTextInput
        });
      } else if (displayCustom && typeof displayCustom === 'function') {
        return displayCustom();
      }
      return null;
    };

    _this.w = _this.props.width || 200;
    _this.h = _this.props.height || _this.w;
    _this.cursorExt = _this.props.cursor === true ? 0.3 : _this.props.cursor / 100;
    _this.angleArc = _this.props.angleArc * Math.PI / 180;
    _this.angleOffset = _this.props.angleOffset * Math.PI / 180;
    _this.startAngle = 1.5 * Math.PI + _this.angleOffset;
    _this.endAngle = 1.5 * Math.PI + _this.angleOffset + _this.angleArc;
    _this.digits = Math.max(String(Math.abs(_this.props.min)).length, String(Math.abs(_this.props.max)).length, 2) + 2;
    return _this;
  }

  _createClass(Knob, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawCanvas();
      if (!this.props.readOnly) {
        this.canvasRef.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.width && this.w !== nextProps.width) {
        this.w = nextProps.width;
      }
      if (nextProps.height && this.h !== nextProps.height) {
        this.h = nextProps.height;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.drawCanvas();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
    }

    // Calculate ratio to scale canvas to avoid blurriness on HiDPI devices

  }, {
    key: 'drawCanvas',
    value: function drawCanvas() {
      var ctx = this.canvasRef.getContext('2d');
      var scale = this.getCanvasScale(ctx);
      this.canvasRef.width = this.w * scale; // clears the canvas
      this.canvasRef.height = this.h * scale;
      ctx.scale(scale, scale);
      this.xy = this.w / 2; // coordinates of canvas center
      this.lineWidth = this.xy * this.props.thickness;
      this.radius = this.xy - this.lineWidth / 2;
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = this.props.lineCap;
      // background arc
      ctx.beginPath();
      ctx.strokeStyle = this.props.bgColor;
      ctx.arc(this.xy, this.xy, this.radius, this.endAngle - 0.00001, this.startAngle + 0.00001, true);
      ctx.stroke();
      // foreground arc
      var a = this.getArcToValue(this.props.value);
      ctx.beginPath();
      ctx.strokeStyle = this.props.fgColor;
      ctx.arc(this.xy, this.xy, this.radius, a.startAngle, a.endAngle, a.acw);
      ctx.stroke();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          canvasClassName = _props.canvasClassName,
          className = _props.className,
          disableMouseWheel = _props.disableMouseWheel,
          readOnly = _props.readOnly,
          title = _props.title,
          value = _props.value;


      return _react3.default.createElement(
        'div',
        {
          className: className,
          style: { width: this.w, height: this.h, display: 'inline-block' },
          onWheel: readOnly || disableMouseWheel ? null : this.handleWheel
        },
        _react3.default.createElement('canvas', {
          ref: function ref(_ref) {
            _this2.canvasRef = _ref;
          },
          className: canvasClassName,
          style: { width: '100%', height: '100%' },
          onMouseDown: readOnly ? null : this.handleMouseDown,
          title: title ? title + ': ' + value : value
        }),
        this.renderCenter()
      );
    }
  }]);

  return Knob;
}(_react3.default.Component), _class.propTypes = {
  value: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onChangeEnd: _propTypes2.default.func,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  log: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  thickness: _propTypes2.default.number,
  lineCap: _propTypes2.default.oneOf(['butt', 'round']),
  bgColor: _propTypes2.default.string,
  fgColor: _propTypes2.default.string,
  inputColor: _propTypes2.default.string,
  font: _propTypes2.default.string,
  fontWeight: _propTypes2.default.string,
  clockwise: _propTypes2.default.bool,
  cursor: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),
  stopper: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  disableTextInput: _propTypes2.default.bool,
  displayInput: _propTypes2.default.bool,
  displayCustom: _propTypes2.default.func,
  angleArc: _propTypes2.default.number,
  angleOffset: _propTypes2.default.number,
  disableMouseWheel: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  className: _propTypes2.default.string,
  canvasClassName: _propTypes2.default.string
}, _class.defaultProps = {
  onChangeEnd: function onChangeEnd() {},
  min: 0,
  max: 100,
  step: 1,
  log: false,
  width: 200,
  height: 200,
  thickness: 0.35,
  lineCap: 'butt',
  bgColor: '#EEE',
  fgColor: '#EA2',
  inputColor: '',
  font: 'Arial',
  fontWeight: 'bold',
  clockwise: true,
  cursor: false,
  stopper: true,
  readOnly: false,
  disableTextInput: false,
  displayInput: true,
  angleArc: 360,
  angleOffset: 0,
  disableMouseWheel: false,
  className: null,
  canvasClassName: null
}, _temp));

exports.default = Knob;
