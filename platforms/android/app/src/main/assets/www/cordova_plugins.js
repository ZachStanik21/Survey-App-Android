cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.notification_android",
    "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-mauron85-background-geolocation.BackgroundGeolocation",
    "file": "plugins/cordova-plugin-mauron85-background-geolocation/www/BackgroundGeolocation.js",
    "pluginId": "cordova-plugin-mauron85-background-geolocation",
    "clobbers": [
      "BackgroundGeolocation"
    ]
  },
  {
    "id": "cordova-plugin-mauron85-background-geolocation.radio",
    "file": "plugins/cordova-plugin-mauron85-background-geolocation/www/radio.js",
    "pluginId": "cordova-plugin-mauron85-background-geolocation"
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-custom-geofence.TransitionType",
    "file": "plugins/cordova-plugin-custom-geofence/www/TransitionType.js",
    "pluginId": "cordova-plugin-custom-geofence",
    "clobbers": [
      "TransitionType"
    ]
  },
  {
    "id": "cordova-plugin-custom-geofence.geofence",
    "file": "plugins/cordova-plugin-custom-geofence/www/geofence.js",
    "pluginId": "cordova-plugin-custom-geofence",
    "clobbers": [
      "geofence"
    ]
  },
  {
    "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
    "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
    "pluginId": "de.appplant.cordova.plugin.local-notification",
    "clobbers": [
      "cordova.plugins.notification.local",
      "plugin.notification.local"
    ]
  },
  {
    "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
    "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
    "pluginId": "de.appplant.cordova.plugin.local-notification",
    "clobbers": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
    "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
    "pluginId": "de.appplant.cordova.plugin.local-notification",
    "merges": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-dialogs": "2.0.1",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-vibration": "3.1.0",
  "cordova-plugin-device": "2.0.2",
  "cordova-android-support-gradle-release": "1.4.4",
  "cordova-plugin-mauron85-background-geolocation": "3.0.0-alpha.43",
  "cordova-plugin-add-swift-support": "1.7.2",
  "es6-promise-plugin": "4.2.2",
  "cordova-plugin-custom-geofence": "0.7.7",
  "cordova-plugin-app-event": "1.2.1",
  "de.appplant.cordova.plugin.local-notification": "0.8.5"
};
// BOTTOM OF METADATA
});