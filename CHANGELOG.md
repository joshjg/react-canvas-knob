# Unreleased
* Added prop to disable mouse wheel action.
* Added prop to add title attribute on the wheel.

# 0.3.0
* Added boolean property `disableTextInput`
* Switched `touchStart` from React SyntheticEvent to vanilla DOM event handler
* Added `preventDefault` on touch events to stop unintentional scrolling
* Added `touchCancel` handler

# 0.2.0
* Added boolean property `log` to enable logarithmic scale mode
* Fixed input coercing when `step < 0`
* Added webpack config for development
