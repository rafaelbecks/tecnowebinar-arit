cordova.define("com.catchoom.craftar.CraftARCollectionManager", function(require, exports, module) {
//
//  CraftARCollectionManager.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";

/**
 * The CraftARCollectionManager manages on-device collections.
 * @constructor
 */
function CraftARCollectionManager() {		
}


/**
 * Add an on-device collection to the device from a local collection bundle file
 * 
 * @param {string} bundleFile
 *     Local path for the collection bundle file.
 * @param {function(collection)} success
 *     Callback function executed on success. The parameter is the collection added.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 * @param {function(progress)} [progress]
 *     Passes a value representing the progress done adding the collection.
 *
 */
CraftARCollectionManager.prototype.addCollectionWithBundleFile = function(bundleFile, success, error, progress) {
	var responseSuccess = function(obj) {
		if(obj.event == 'progress') {
			if (typeof(progress) !== "undefined") {
				progress(obj.result);
			}
		} else {
			success(obj.result);
		}
	};
    exec(responseSuccess, error, PLUGIN_NAME, "onDeviceCMAddCollectionWithBundleFile", [bundleFile]);
}

/**
 * Add an on-device collection to the device from the CraftAR Service using a collection token
 * 
 * @param {string} token
 *     Token for the collection bundle to be added.
 * @param {function(collection)} success
 *     Callback function executed on success. The parameter is the collection added.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 * @param {function(progress)} [progress]
 *     Passes a value representing the progress done adding the collection.
 */
CraftARCollectionManager.prototype.addCollectionWithToken = function(token, success, error, progress) {
	var responseSuccess = function(obj) {
		if(obj.event == 'progress') {
			if (typeof(progress) !== "undefined") {
				progress(obj.result);
			}
		} else {
			success(obj.result);
		}
	};
    exec(responseSuccess, error, PLUGIN_NAME, "onDeviceCMAddCollectionWithToken", [token]);
}

/**
 * Remove an on-device collection from the device
 * 
 * @param {Collection} collection
 *     Token for the collection to be removed.
 * @param {function()} success
 *     Callback function executed on success.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 */
CraftARCollectionManager.prototype.deleteCollection = function(collection, success, error) {	
    exec(success, error, PLUGIN_NAME, "onDeviceCMDeleteCollection", [collection.uuid]);
}

/**
 * Remove an on-device collection from the device using a token
 * 
 * @param {string} token
 *     Token for the collection to be deleted.
 * @param {function()} success
 *     Callback function executed on success.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 */
CraftARCollectionManager.prototype.deleteCollectionWithToken = function(token, success, error) {
    exec(success, error, PLUGIN_NAME, "onDeviceCMDeleteCollectionWithToken", [token]);
}

/**
 * Get an on-device collection from the device using a token
 * 
 * @param {string} token
 *     Token for the collection.
 * @param {function(collection)} success
 *     Callback function executed on success. The parameter is the collection obtained.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 */
CraftARCollectionManager.prototype.getCollectionWithToken = function(token, success, error){
    exec(success, error, PLUGIN_NAME, "onDeviceCMGet", [token]);
}


/**
 * Set the url to synchronize collections when using a proxy server to the CraftAR service
 */
CraftARCollectionManager.prototype.setSyncURL = function(url){
	exec(null, null, PLUGIN_NAME, "onDeviceCMSetSyncURL", [url]);
}

/**
 * Synchronize a collection with the remote collection in the CraftAR service
 * 
 * @param {Collection} collection
 *     Collection to synchronzie
 * @param {function(collection)} success
 *     Callback function executed on success. The parameter is the collection syncd.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 * @param {function(progress)} [progress]
 *     Passes a value representing the progress done syncing the collection.
 */
CraftARCollectionManager.prototype.syncCollection = function(collection, success, error, progress) {
	var responseSuccess = function(obj) {
		if(obj.event == 'progress') {
			if (typeof(progress) !== "undefined") {
				progress(obj.result);
			}
		} else {
			success(obj.result);
		}
	};
    exec(responseSuccess, error, PLUGIN_NAME, "onDeviceCMSyncCollection", [collection.uuid]);
}

/**
 * Synchronize a collection with the remote collection in the CraftAR service
 * 
 * @param {string} token
 *     Token for the collection to synchronzie
 * @param {function(collection)} success
 *     Callback function executed on success. The parameter is the collection syncd.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 * @param {function(progress)} [progress]
 *     Passes a value representing the progress done syncing the collection.
 */
CraftARCollectionManager.prototype.syncCollectionWithToken = function(collection, token, success, error, progress) {
	var responseSuccess = function(obj) {
		if(obj.event == 'progress') {
			if (typeof(progress) !== "undefined") {
				progress(obj.result);
			}
		} else {
			success(obj.result);
		}
	};
    exec(responseSuccess, error, PLUGIN_NAME, "onDeviceCMSyncCollectionWithToken", [collection.uuid, token]);
}

module.exports = new CraftARCollectionManager();

});
