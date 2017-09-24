# 0.5.0
* HiDPI scaling support
* Changing the width/height props after mount now updates the component
* `onChangeEnd` handler now optional
* Added `className` and `canvasClassName` props

# 0.4.0
* Added `displayCustom`, which allows ability to render custom component in the centre of the knob, if `displayInput` is set to false.
* Added prop to disable mouse wheel action.
* Added prop to add title attribute on the wheel.
* Added ability to set height and width independently
* Exposed mouseUp and touchEnd handler as `onChangeEnd`

# 0.3.0
* Added boolean property `disableTextInput`
* Switched `touchStart` from React SyntheticEvent to vanilla DOM event handler
* Added `preventDefault` on touch events to stop unintentional scrolling
* Added `touchCancel` handler

# 0.2.0
* Added boolean property `log` to enable logarithmic scale mode
* Fixed input coercing when `step < 0`
* Added webpack config for development
