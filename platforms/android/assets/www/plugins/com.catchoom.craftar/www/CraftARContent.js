cordova.define("com.catchoom.craftar.CraftARContent", function(require, exports, module) {
//
//  CraftARContent.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";


/**
 * An AR content represents an image, video, button or 3D model to be drawn on top
 * of a reference image
 * @see CraftARContentImage
 * @see CraftARContentVideo
 * @see CraftARContentButton
 * @see CraftARContent3dModel
 * @see CraftARTracking
 * @constructor
 */
function CraftARContent(){
	this._alpha = 1;
	this_wrapMode = 5;
}

CraftARContent.prototype.instanceId = "";

CraftARContent.prototype._oncreated = null;

CraftARContent.prototype._created = function(instanceId){
	this.instanceId = instanceId;
	this._oncreated(this);
}

CraftARContent.prototype.response = function(response){
	var func = this["_" + response.event].bind(this);
	if(func) {
    	func(response.result);
	}
}

/**
 * Set the scale for the content passing a 3 dimension vector for the scale in the
 * x, y and z axis.
 */
CraftARContent.prototype.setScale = function(matrix){
  	exec(null, null, PLUGIN_NAME, "contentSetScale", [this.instanceId, matrix]);
}

/**
 * Set the translation for the content passing a 3 dimension vector for the translation in the
 * x, y and z axis.
 */
CraftARContent.prototype.setTranslation = function(matrix){
  	exec(null, null, PLUGIN_NAME, "contentSetTranslation", [this.instanceId, matrix]);
}

/**
 * Set the rotation for the content passing a 4x4 homogeneous rotation Matrix.
 */
CraftARContent.prototype.setRotation = function(matrix){
  	exec(null, null, PLUGIN_NAME, "contentSetRotation", [this.instanceId, matrix]);
}

/**
 * @name CraftARContent#alpha
 * @description alpha transparency for drawing this content
 */
Object.defineProperty(CraftARContent.prototype, 'alpha', {
    get: function() {
      	return this._alpha;
    },
    set: function(value) {
    	this._alpha = value;
      	exec(null, null, PLUGIN_NAME, "contentSetAlpha", [this.instanceId, value]);
    }
});

/**
 * @name CraftARContent#wrapMode
 * @description Set the mode for drawing the content on top of the reference image
 * Use this for flat contents (images, buttons and videos)
 * 
 <pre>
 * CraftARContentInterface.CRAFTAR_TRACKING_WRAP_SCALE_FILL
 *    Scale content to fill the reference image 
 *
 * CraftARContentInterface.CRAFTAR_TRACKING_WRAP_ASPECT_FILL
 *    Scale content to fill the reference image maintaining the content's aspect ratio 
 *
 * CraftARContentInterface.RAFTAR_TRACKING_WRAP_ASPECT_FIT
 *    Scale content to fit the reference image maintaining the content's aspect ratio 
 *
 * CraftARContentInterface.CRAFTAR_TRACKING_WRAP_REF_WIDTH_FIXED
 *    Default wrap mode, the contents have their natural size relative to the with of the screen (assuming 600px) 
 * </pre>
 */
Object.defineProperty(CraftARContent.prototype, 'wrapMode', {
    get: function() {
      	return this._wrapMode;
    },
    set: function(value) {
      	this._wrapMode = value;
	  	exec(null, null, PLUGIN_NAME, "contentSetWrapMode", [this.instanceId, value]);
    }
});

/**
 * Attach the content to an ARItem obtained through a Cloud Image Recognition response
 * or from an on-device collection.
 */
CraftARContent.prototype.attachTo = function(arItem) {
	exec(null, null, PLUGIN_NAME, "contentAddContent", [this.instanceId, arItem.uuid]);
}

/**
 * Detach the content from an ARItem
 */
CraftARContent.prototype.detachFrom = function(arItem) {
  exec(null, null, PLUGIN_NAME, "contentRemoveContent", [this.instanceId, arItem.uuid]);
}



/**************************************/

/**
 * Create a new 3D model AR content
 * @constructor
 * @see CraftARContentInterface#create3dModelContentWithPath
 */
function CraftARContent3dModel() {

}
CraftARContent3dModel.prototype = new CraftARContent();

CraftARContent3dModel.prototype.initWithModel = function(modelPath, textures, success) {
  this._oncreated = success;
  exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentModelInitWithTextures',[modelPath, textures, true]);
}

CraftARContent3dModel.prototype.initWithModelUrl = function(modelUrl, textures, success) {
  this._oncreated = success;
  exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentModelInitWithTextures',[modelUrl, textures, false]);
}

/**************************************/

/**
 * Image content - do not use the constructor directly
 * @constructor
 * @see CraftARContentInterface#createImageContentWithPath
 */
function CraftARContentImage() {
}
CraftARContentImage.prototype = new CraftARContent();

CraftARContentImage.prototype.initWithImage = function(imagePath, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentImageInitWithImage',[imagePath , true]);
}

CraftARContentImage.prototype.initWithImageUrl = function(imageUrl, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentImageInitWithImage',[imageUrl, false]);
}

/**
 * Video content - do not use the constructor directly
 * @constructor
 * @see CraftARContentInterface#createVideoContentWithPath
 */
function CraftARContentVideo(){
	this._muted = false;
	this._autoPlay = true;
	this._looping = false;
	this._volume = 1;
}
CraftARContentVideo.prototype = new CraftARContent();

CraftARContentVideo.prototype.initWithVideo = function(videoPath, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentVideoInitWithVideo',[videoPath , true]);
}

CraftARContentVideo.prototype.initWithVideoUrl = function(videoUrl, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentVideoInitWithVideo',[videoUrl , false]);
}

/**
 * Start playing a video content
 */
CraftARContentVideo.prototype.play = function() {
	exec(null, null, PLUGIN_NAME,'contentVideoPlay',[this.instanceId]);
}

/**
 * Pause the video playback
 */
CraftARContentVideo.prototype.pause = function() {
	exec(null, null, PLUGIN_NAME,'contentVideoPause',[this.instanceId]);
}

/**
 * Stop the video playback, will rewind the video.
 */
CraftARContentVideo.prototype.stop = function() {
	exec(null, null, PLUGIN_NAME,'contentVideoStop',[this.instanceId]);
}

/**
 * @name CraftARContentVideo#autoPlay
 * @description {boolean} Autoplay video when the AR item tracking starts
 * (video contents autoplay by default when they are tracked)
 */
Object.defineProperty(CraftARContentVideo.prototype, 'autoPlay', {
    get: function() {
      	return this._autoPlay;
    },
    set: function(value) {
      	this._autoPlay = value;
		exec(null, null, PLUGIN_NAME,'contentVideoSetAutoPlay',[this.instanceId, value]);
    }
});

/**
 * @name CraftARContentVideo#looping
 * @description {boolean} Play video in a loop
 */
Object.defineProperty(CraftARContentVideo.prototype, 'looping', {
    get: function() {
      	return this._looping;
    },
    set: function(value) {
      	this._looping = value;
		exec(null, null, PLUGIN_NAME,'contentVideoSetLooping',[this.instanceId, value]);
    }
});

/**
 * @name CraftARContentVideo#muted
 * @description {boolean} Wether the video is muted or not
 */
Object.defineProperty(CraftARContentVideo.prototype, 'muted', {
    get: function() {
      	return this._muted;
    },
    set: function(value) {
      	this._muted = value;
		exec(null, null, PLUGIN_NAME,'contentVideoSetMuted',[this.instanceId, value]);
    }
});

/**
 * @name CraftARContentVideo#volume
 * @description {float} volume for the video sound
 */
Object.defineProperty(CraftARContentVideo.prototype, 'volume', {
    get: function() {
      	return this._volume;
    },
    set: function(value) {
      	this._volume = value;
		exec(null, null, PLUGIN_NAME,'contentVideoSetVolume',[this.instanceId, value]);
    }
});


/**
 * Button content - do not use the constructor directly
 * @constructor
 * @see CraftARContentInterface#createButtonContentWithImagesPath
 */
function CraftARContentButton() {
}
CraftARContentButton.prototype = new CraftARContent();

CraftARContentButton.prototype.initWithImages = function(image1, image2, action, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentButtonInitWithImages',[image1, image2, action, true]);
}

CraftARContentButton.prototype.initWithImagesUrl = function(image1, image2, action, success) {
	this._oncreated = success;
	exec(this.response.bind(this), this.response.bind(this),PLUGIN_NAME,'contentButtonInitWithImages',[image1, image2, action, false]);
}
/**************************************/

/**
 * @class CraftARContentInterface
 */
function CraftARContentInterface() {
}

/**
 * Create an image content with the path of a local image.
 */
CraftARContentInterface.prototype.createImageContentWithPath = function(imagePath, success) {
    var contentImage = new CraftARContentImage();
    contentImage.initWithImage(imagePath, success);
}

/**
 * Create an image content with the url of an image.
 */
CraftARContentInterface.prototype.createImageContentWithUrl = function(imageUrl, success) {
    var contentImage = new CraftARContentImage();
    contentImage.initWithImageUrl(imageUrl, success);
}


/**
 * Create a video content with the path to a local .mp4 (H264, AAC audio) file.
 */
CraftARContentInterface.prototype.createVideoContentWithPath = function(imageVideo, success) {
    var contentVideo = new CraftARContentVideo();
    contentVideo.initWithVideo(imageVideo, success);
}

/**
 * Create a video content with the url to a remote .mp4 (H264, AAC audio) file.
 */
CraftARContentInterface.prototype.createVideoContentWithUrl = function(imageVideo, success) {
    var contentVideo = new CraftARContentVideo();
    contentVideo.initWithVideoUrl(imageVideo, success);
}

/**
 * Create A button content using two images for the normal and the pressed status and
 * a URL to open when the button is clicked
 */
CraftARContentInterface.prototype.createButtonContentWithImagesPath = function(image1, image2, action, success) {
    var contentButton = new CraftARContentButton();
    contentButton.initWithImages(image1, image2, action, success);
}

/**
 * Create A button content using the urls of two images for the normal and the pressed status and
 * a URL to open when the button is clicked
 */
CraftARContentInterface.prototype.createButtonContentWithImagesUrl = function(image1, image2, action, success) {
    var contentButton = new CraftARContentButton();
    contentButton.initWithImagesUrl(image1, image2, action, success);
}

/**
 * Create a 3D model from a local path.
 * @param modelPath local url of the model
 * @param textures JSON dictionary mapping texture names inside the mtl file to local files.
 * @param success(model) executed when the model as been created successfully, passed the created 3D model.
 */
CraftARContentInterface.prototype.create3dModelContentWithPath = function(model, textures, success) {
    var contentModel = new CraftARContent3dModel();
    contentModel.initWithModel(model, textures, success);
}

/**
 * Create a 3D model from a url.
 * @param modelPath local url of the model
 * @param textures JSON dictionary mapping texture names inside the mtl file urls.
 * @param success(model) executed when the model as been created successfully, passed the created 3D model.
 */
CraftARContentInterface.prototype.create3dModelContentWithUrl = function(model, textures, success) {
    var contentModel = new CraftARContent3dModel();
    contentModel.initWithModelUrl(model, textures, success);
}

CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_NONE            = 0;
CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_REF_WIDTH       = 1;
/** Scale content to fill the reference image */
CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_SCALE_FILL      = 2;
/** Scale content to fill the reference image maintaining the content's aspect ratio */
CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_ASPECT_FILL     = 3;
/** Scale content to fit the reference image maintaining the content's aspect ratio */
CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_ASPECT_FIT      = 4;
/** Default wrap mode, the contents have their natural size relative to the with of the screen (assuming 600px) */
CraftARContentInterface.prototype.CRAFTAR_TRACKING_WRAP_REF_WIDTH_FIXED = 5;


module.exports = new CraftARContentInterface();

});
