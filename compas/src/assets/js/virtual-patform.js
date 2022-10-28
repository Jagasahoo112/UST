
function initUnityvirtualplatform(){
  
var buildUrl = "assets/Virtualvisualization/Build";
var loaderUrl = buildUrl + "/WebEyAr.loader.js";
var config = {
  dataUrl: buildUrl + "/WebEyAr.data",
  frameworkUrl: buildUrl + "/WebEyAr.framework.js",
  codeUrl: buildUrl + "/WebEyAr.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "360ARPresentation",
  productVersion: "0.1",
};
let _unityInstance = null;
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var mobileWarning = document.querySelector("#unity-mobile-warning");

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  container.className = "unity-mobile";
  // Avoid draining fillrate performance on mobile devices,
  // and default/override low DPI mode on mobile browsers.
  config.devicePixelRatio = 1;
  mobileWarning.style.display = "block";
  setTimeout(() => {
    mobileWarning.style.display = "none";
  }, 5000);
} else {
  canvas.style.width = "960px";
  canvas.style.height = "600px";
}
loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  })
    .then((unityInstance) => {
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
      _unityInstance = unityInstance;
    })
    .catch((message) => {
      alert(message);
    });
};
document.body.appendChild(script);

document.addEventListener("DOMContentLoaded", function () {
  var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "910098f99d48449daf094d814813de9e",
    "northeurope"
  );

  speechConfig.speechSynthesisVoiceName =
    "Microsoft Server Speech Text to Speech Voice (en-US, GuyNeural)";
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
});

var phraseDiv;
var startOnceRecord;
var stopRecord;
var startContinousRecord;
var SpeechSDK;
var recognizer;
var SpeechSDK;
var synthesizer;
var player;

// function recordAudioInHtmlFile() {
//    alert("got call from uniy")
//   listenDiscontinousAudio();
// }
var SpeechSDK = null;
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
}
recordAudioInHtmlFile = ()=>{
  listenDiscontinousAudio();
}
// function convertTextToSpeechInHtmlFile(jsString) {
//     alert(jsString);
//   ConvertTextToSpeech(jsString);
// }
convertTextToSpeechInHtmlFile = (jsString)=>{
  ConvertTextToSpeech(jsString);
}

function ConvertTextToSpeech(stringMsg) {
  var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "910098f99d48449daf094d814813de9e",
    "northeurope"
  );

  speechConfig.speechSynthesisVoiceName =
    "Microsoft Server Speech Text to Speech Voice (en-US, GuyNeural)";
  //  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

  player = new SpeechSDK.SpeakerAudioDestination();
  player.onAudioStart = function (_) {
     
    _unityInstance.SendMessage("UnityBridge", "AudioStartCallBackFromJS");
  };

  player.onAudioEnd = function (_) {
     
    _unityInstance.SendMessage("UnityBridge", "AudioEndCallBackFromJS");
  };

  //-----------this code chunk is edited to get start and stop audio call back------//
  var audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);
  synthesizer = new SpeechSDK.SpeechSynthesizer(
    speechConfig,
    audioConfig
  );
  //-------------------------------------------------------------------------------//

  let inputText = stringMsg;
  synthesizer.speakTextAsync(
    inputText,
    function (result) {
      window.console.log(result);

      synthesizer.close();   
      synthesizer = undefined;
    },
    function (err) {
      startSpeakTextAsyncButton.disabled = false;
      window.console.log(err);
      synthesizer.close();
      synthesizer = undefined;
    }
  );
}

function listenDiscontinousAudio() {
  //unityInstance.SendMessage("UnityBridge", "GetButtonState", 0); //0=true, 1=false

  var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
    "910098f99d48449daf094d814813de9e",
    "northeurope"
  );

  speechConfig.speechRecognitionLanguage = "en-US";
  // speechConfig.speechSynthesisVoiceName = "ChristopherNeural";
  speechConfig.addTargetLanguage("en-US");

  var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

  recognizer = new SpeechSDK.TranslationRecognizer(
    speechConfig,
    audioConfig
  );
  recognizer.continuous = true;
  recognizer.recognizeOnceAsync(
    function (result) {
     // unityInstance.SendMessage("UnityBridge", "GetButtonState", 1);
      let translation = result.translations.get("en");
      //alert(translation);
      _unityInstance.SendMessage(
        "UnityBridge",
        "SendToUnity",
        translation
      );

      recognizer.close();
      recognizer = undefined;
    },
    function (err) {
    //  _unityInstance.SendMessage("UnityBridge", "GetButtonState", 1);
      window.console.log(err);
      recognizer.close();
      recognizer = undefined;
    }
  );
}
}