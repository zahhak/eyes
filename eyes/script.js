var global = {
    watchID : null,
    irisScale : 0.20,
    irisTranslate : {
        x : 0,
        y : 0,
        maxX : 280,
        maxY : 280
    },
};    

function setTransfromOnIrisClass() {
    var irises = document.getElementsByClassName("iris");
    for(var i = 0; i < irises.length; i++){
        var iris = irises[i];
        
        iris.style.webkitTransform = "scale(" + global.irisScale + "," + global.irisScale + ") translate("+ global.irisTranslate.x + "px," + global.irisTranslate.y + "px)"; 
    }
}

function startListeningForAccelorometerChanges() {
    function onSuccess(acceleration) {
        var maxX = global.irisTranslate.maxX;
        var maxY = global.irisTranslate.maxY;
        
        var x = acceleration.x * 70;
        var y = -acceleration.y * 70;
        if (x > maxX ) {
            x = maxX;
        }
        if (x < -maxX) {
            x = -maxX;
        }
        
        if (y > maxY ) {
            y = maxY;
        }
        if (y < -maxY) {
            y = -maxY;
        }
        
        global.irisTranslate.x = x;
        global.irisTranslate.y = y;
        
        setTransfromOnIrisClass();
    };
    
    function onError() {
        alert('onError!');
    };
    
    var options = { frequency: 100 };
    global.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function onDeviceReady() {
    console.log("onDeviceReady");
    startListeningForAccelorometerChanges();
}

function onPause() {
    console.log("onPause");
    if (global.watchID !== null) {
        navigator.accelerometer.clearWatch(global.watchID);
        global.watchID = null;
    }
}

function onResume() {
    console.log("onResume");
    if (global.watchID === null) {
        startListeningForAccelorometerChanges();
    }
}

function test() {
    console.log("test");
    global.irisTranslate.x = Math.random() * 150 - 75;
    global.irisTranslate.y = Math.random() * 150 - 75;
    setTransfromOnIrisClass();
}

