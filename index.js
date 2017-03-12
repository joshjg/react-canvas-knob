'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Knob = function (_React$Component) {
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
      _this.props.onChangeEnd(_this.eventToValue(e.changedTouches[_this.touchIndex]));
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

    _this.renderCentre = function () {
      if (_this.props.displayInput) {
        return _react2.default.createElement('input', {
          style: _this.inputStyle(),
          type: 'text',
          value: _this.props.value,
          onChange: _this.handleTextInput,
          onKeyDown: _this.handleArrowKey,
          readOnly: _this.props.readOnly || _this.props.disableTextInput
        });
      } else if (_this.props.displayCustom && typeof _this.props.displayCustom === 'function') {
        return _this.props.displayCustom();
      }
      return null;
    };

    _this.render = function () {
      return _react2.default.createElement(
        'div',
        {
          style: { width: _this.w, height: _this.h, display: 'inline-block' },
          onWheel: _this.props.readOnly || _this.props.disableMouseWheel ? null : _this.handleWheel
        },
        _react2.default.createElement('canvas', {
          ref: function ref(_ref) {
            _this.canvasRef = _ref;
          },
          style: { width: '100%', height: '100%' },
          onMouseDown: _this.props.readOnly ? null : _this.handleMouseDown,
          title: _this.props.title ? _this.props.title + ': ' + _this.props.value : _this.props.value
        }),
        _this.renderCentre()
      );
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.drawCanvas();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
    }
  }, {
    key: 'drawCanvas',
    value: function drawCanvas() {
      this.canvasRef.width = this.w; // clears the canvas
      this.canvasRef.height = this.h;
      var ctx = this.canvasRef.getContext('2d');
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
  }]);

  return Knob;
}(_react2.default.Component);

Knob.propTypes = {
  value: _react2.default.PropTypes.number.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  onChangeEnd: _react2.default.PropTypes.func,
  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,
  step: _react2.default.PropTypes.number,
  log: _react2.default.PropTypes.bool,
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  thickness: _react2.default.PropTypes.number,
  lineCap: _react2.default.PropTypes.oneOf(['butt', 'round']),
  bgColor: _react2.default.PropTypes.string,
  fgColor: _react2.default.PropTypes.string,
  inputColor: _react2.default.PropTypes.string,
  font: _react2.default.PropTypes.string,
  fontWeight: _react2.default.PropTypes.string,
  clockwise: _react2.default.PropTypes.bool,
  cursor: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
  stopper: _react2.default.PropTypes.bool,
  readOnly: _react2.default.PropTypes.bool,
  disableTextInput: _react2.default.PropTypes.bool,
  displayInput: _react2.default.PropTypes.bool,
  displayCustom: _react2.default.PropTypes.func,
  angleArc: _react2.default.PropTypes.number,
  angleOffset: _react2.default.PropTypes.number,
  disableMouseWheel: _react2.default.PropTypes.bool,
  title: _react2.default.PropTypes.string
};
Knob.defaultProps = {
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
  disableMouseWheel: false
};
exports.default = Knob;
