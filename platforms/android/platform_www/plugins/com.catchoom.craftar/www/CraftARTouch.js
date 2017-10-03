cordova.define("com.catchoom.craftar.CraftARTouch", function(require, exports, module) {
//
//  CraftARTouch.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";

/**
 * Interface to receive touch events on AR contents (don't call the constructor directly)
 * @constructor
 */ 
function CraftARTouch() {
    exec(this.onTouched.bind(this), null, PLUGIN_NAME, "touchProtocol", []); 
}

CraftARTouch.prototype.onTouched = function (event) {
	if (this._touched != null){
		this._touched(event);
	}
}

/**
 * Subscribe to touch events
 * @param {function} func Called when a content is touched
 */
CraftARTouch.prototype.onTouchEvent = function (func){
	this._touched = func;
}

/** Touch in in content */
CraftARTouch.prototype.CRAFTAR_CONTENT_TOUCH_IN 				= 0;
/** Touch out in content */
CraftARTouch.prototype.CRAFTAR_CONTENT_TOUCH_OUT				= 1;
/** Touch down in content */
CraftARTouch.prototype.CRAFTAR_CONTENT_TOUCH_DOWN				= 2;
/** Touch up in content */
CraftARTouch.prototype.CRAFTAR_CONTENT_TOUCH_UP      			= 3;

module.exports = new CraftARTouch();


});
