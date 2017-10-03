cordova.define("com.catchoom.craftar.CraftARTracking", function(require, exports, module) {
//
//  CraftARTracking.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";

/**
 * Interface to manage the AR scene
 * @constructor
 */ 
function CraftARTracking() {
    this.isTracking = false;
    exec(this.response.bind(this), this.response.bind(this), PLUGIN_NAME, "craftARTrackingProtocol", []); 
}

CraftARTracking.prototype.on = function (event, func){
	this[event] = func;
}

CraftARTracking.prototype.response = function(response){
	var func = this["_" + response.event].bind(this);
	if(func) {
    	func(response.result);
	}
}

/**
 *  Add an AR item for tracking
 */
CraftARTracking.prototype.addItem = function(item, success, error) {
    exec(success, error, PLUGIN_NAME, "addItem", [item.uuid]);
}

/**
 * Start tracking
 */ 
CraftARTracking.prototype.startTracking = function() {
    exec(function(){this.isTracking = true}.bind(this), null, PLUGIN_NAME, "startTracking", []);
}

/**
 * Start tracking with a timeout in seconds. The
 * callback passed to onTrackingTimeout will be triggered after that time.
 * @see CraftARTracking#onTrackingTimeOut
 */ 
CraftARTracking.prototype.startTrackingWithTimeout = function(timeout) {
    exec(null, null, PLUGIN_NAME, "startTrackingWithTimeout", [timeout]);
}

/**
 * Returns true if the tracking is running
 */
CraftARTracking.prototype.isTracking = function() {
    return this.isTracking;
}

/** 
 * Stop the tracking
 */ 
CraftARTracking.prototype.stopTracking = function() {
    exec(function(){this.isTracking = false}.bind(this), null, PLUGIN_NAME, "stopTracking", []);
}

/**
 * Remove an AR item from the tracking
 */ 
CraftARTracking.prototype.removeItem = function(item){
	exec(null, null, PLUGIN_NAME, "removeItem", [item.uuid]);
}

/**
 * Remove all AR items from the tracking
 */
CraftARTracking.prototype.removeAllItems = function(){
	exec(null, null, PLUGIN_NAME, "removeAllItems", []);
}

/**
 * Set callback method for when an AR item starts being tracked.
 * The callback will receive an arItem as a parameter
 */
CraftARTracking.prototype.onStartTracking = function(func) {    
    this._didStartTracking = func;
}

/**
 * Set callback method for when an AR item stops being tracked.
 * The callback will receive an arItem as a parameter
 */
CraftARTracking.prototype.onStopTracking = function(func) {  
    this._didStopTracking = func;
}

/**
 * Set the callback for the Tracking timeout
 * @see CraftARTracking#startTrackingWithTimeout
 */ 
CraftARTracking.prototype.onTrackingTimeOut = function(func) {
	this._trackingTimeoutOver = func;
}

module.exports = new CraftARTracking();
});
