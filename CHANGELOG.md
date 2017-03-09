#Unreleased
* Added `displayCustom`, which allows ability to render custom component in the centre of the knob, if `displayInput` is set to false.
* Added prop to disable mouse wheel action.

# 0.3.0
* Added boolean property `disableTextInput`
* Switched `touchStart` from React SyntheticEvent to vanilla DOM event handler
* Added `preventDefault` on touch events to stop unintentional scrolling
* Added `touchCancel` handler

# 0.2.0
* Added boolean property `log` to enable logarithmic scale mode
* Fixed input coercing when `step < 0`
* Added webpack config for development
