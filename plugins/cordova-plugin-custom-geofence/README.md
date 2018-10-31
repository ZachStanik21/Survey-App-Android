# Cordova Geofence Plugin - customed by PIE
[![version](https://badge.fury.io/js/cordova-plugin-custom-geofence.png)](https://badge.fury.io/js/cordova-plugin-geofence)


Plugin customed form original plugin https://github.com/cowbell/cordova-plugin-geofence
[![version](https://badge.fury.io/js/cordova-plugin-geofence.png)](https://badge.fury.io/js/cordova-plugin-geofence)

And forkded plugin https://github.com/compelling/cordova-plugin-geofence


## Features customed

* Supports iOS swift 3.0
* Supports Android/iOS background behavior (post http request in Java/swift3)


## Files modified
src/android/TransitionReceiver.java
```
protected String doInBackground(String... geofencesJson) {
  try {
    Log.println(Log.DEBUG, GeofencePlugin.TAG, "Executing PostLocationTask#doInBackground");
    GeoNotification[] geoNotifications = Gson.get().fromJson(geofencesJson[0], GeoNotification[].class);
       
    for (int i=0; i < geoNotifications.length; i++){
      GeoNotification geoNotification = geoNotifications[i];
      Webb webb = Webb.create();
      webb.setDefaultHeader(Webb.HDR_AUTHORIZATION, geoNotification.auth);
          
      String remoteUrl = geoNotification.url;
      String franchissement = "";
      if (geoNotification.transitionType == Geofence.GEOFENCE_TRANSITION_EXIT) {
        franchissement = "sortir";
      } else {
        franchissement = "entrer";
      }

      remoteUrl = remoteUrl.concat("&franchissement=").concat(franchissement);
      Response<String> response = webb.post(remoteUrl).asString();

      if (response.isSuccess()) {
         Log.println(Log.DEBUG, GeofencePlugin.TAG,  "Push ajax OK: " + remoteUrl);
      } else {
         Log.println(Log.DEBUG, GeofencePlugin.TAG,  "Push ajax ERROR: " + remoteUrl);
      }
    }
  } catch (Throwable e) {
    Log.println(Log.ERROR, GeofencePlugin.TAG, "Exception posting geofence: " + e);    
  }
  return "Executed";
}
```

src/ios/GeofencePlugin.swift
```
func didReceiveTransition (_ notification: Notification) {
  log("didReceiveTransition")

  // PIE custom native behavior
  if let geoNotificationString = notification.object as? String {
    let data = geoNotificationString.data(using: .utf8)!
      
    if let parsedData = try? JSONSerialization.jsonObject(with: data, options: []) as! [String: Any] {
      let transitionType = parsedData["transitionType"] as? Double
      let url = parsedData["url"] as? String
        
      var franchissement = ""
      if(transitionType == 2) {
        franchissement = "sortir";
      } else {
        franchissement = "entrer"
      }
        
      let concatUrl = url! + "&franchissement=" + franchissement
      let remoteUrl = URL(string: concatUrl)
      log("didReceiveTransition remote url: \(concatUrl)")
        
      let task = URLSession.shared.dataTask(with: remoteUrl!) { data, response, error in
        guard error == nil else {
          log("didReceiveTransition fail with error: \(error!)")
          return
        }
        guard let data = data else {
          log("didReceiveTransition remote success")
          return
        }
        //let json = try! JSONSerialization.jsonObject(with: data, options: [])
        //print(json)
      }
          
      task.resume()
    }
  }
}
```

plugin.xml
```
 <config-file target="*-Info.plist" parent="NSAppTransportSecurity">
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
</config-file>
```

