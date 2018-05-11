
window.cnIsAndroid = function() {
  return typeof (device) != 'undefined' && device.platform == "Android";
};

window.cnSetStatusBarStyle = function(router) {
if (typeof (StatusBar) != 'undefined') {
    if (cnIsAndroid()) {
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#108ee9");
    } else {
        router = router || "/";
        switch (router) {
        case "/":
        case "/dashboard": {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString("#fff");
            break;
        }
        default: {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString("#fff");
        }
        }
    }
}
}

const onDeviceReady = function() {
        try {
            if (typeof (StatusBar) != 'undefined') {
                StatusBar.overlaysWebView(false);
                cnSetStatusBarStyle();
            }
        } catch ( exception ) {

        }
    }
document.addEventListener("deviceready", onDeviceReady, false);


