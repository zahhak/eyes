var global = {
    watchID : null,
    irisScale : 0.20,
    irisTranslate : {
        x : 0,
        y : 0,
        maxLength : 350
    },
};    

function setTransfromOnIrisClass() {
    var irises = document.getElementsByClassName("iris");
    for(var i = 0; i < irises.length; i++){
        var iris = irises[i];
        iris.style.webkitTransform = "scale(" + global.irisScale + "," + global.irisScale + ") \
                                      translate("+ global.irisTranslate.x + "px," + global.irisTranslate.y + "px)"; 
    }
}

function startListeningForAccelorometerChanges() {
    function onSuccess(acceleration) {
        var maxLength = global.irisTranslate.maxLength;
        
        var x = acceleration.x * 40;
        var y = -acceleration.y * 40;
        var length =  Math.sqrt(Math.pow(x,2) + Math.pow(y, 2));
   
        var xySum = Math.abs(x) + Math.abs(y);
        if (length > maxLength) {
            x = maxLength * (x  / xySum );
            y = maxLength * (y  / xySum );
        }
       
        //console.log("Length " + length + "x: " + (x  / xySum) + " y: " + (y  / xySum)); 
        
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