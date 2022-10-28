var recordAudioInHtmlFile = null;
var convertTextToSpeechInHtmlFile = null;

function initUnityDatavisualization() {

  var SpeechSDK = null;
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
}
var fullscreenButtonData = document.getElementById("unity-fullscreen-button-data");

  var unityInstance = UnityLoader.instantiate("unityContainer", "assets/DataVisualization/Build/GDSWebGL.json", {onProgress: UnityProgress});

  function OnSendMessageToUnity(){
    var message = document.getElementById("htmlinput").value;
    unityInstance.SendMessage("UnityBridge", "SendToUnity", message);
  }

  function OnRecordButtonClick(){
    console.log("Record Button Click");
  }
  function OnRefreshClick(){
    console.log("Refresh Button Click");
  }
  
  var recaptureInputAndFocus = function() {
    var canvas = document.getElementById("#canvas");
    if(canvas) {
      canvas.setAttribute("tabindex", "1");
      canvas.focus(); 
    } else
      setTimeout(recaptureInputAndFocus, 100);
  }
  recaptureInputAndFocus();

  
  // status fields and start button in UI
  var phraseDiv;
  var startOnceRecord;
  var stopRecord;
  var startContinousRecord;
  var SpeechSDK;
  var recognizer;
  var SpeechSDK;
  var synthesizer;

  // function _recordAudioInHtmlFile(){
  //   listenDiscontinousAudio();
  // }
  recordAudioInHtmlFile = ()=>{
    listenDiscontinousAudio();
  }
  fullscreenButtonData.addEventListener("click", function () {
    unityInstance.SetFullscreen(1);
  });
  // function convertTextToSpeechInHtmlFile(jsString){
  //   alert(jsString);
  //   ConvertTextToSpeech(jsString);
  // }

  convertTextToSpeechInHtmlFile = (jsString)=>{
    ConvertTextToSpeech(jsString);
  }

  document.addEventListener("DOMContentLoaded", function () {
   
  });

  function ConvertTextToSpeech(stringMsg){
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription("910098f99d48449daf094d814813de9e", "northeurope");
    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

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
});
  }

  function listenDiscontinousAudio(){

      unityInstance.SendMessage("UnityBridge", "GetButtonState", 0);//0=true, 1=false

      var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription("910098f99d48449daf094d814813de9e", "northeurope");

      speechConfig.speechRecognitionLanguage = "en-US";

      speechConfig.addTargetLanguage("en-US")

      var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

      recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
      recognizer.continuous = true;
      recognizer.recognizeOnceAsync(
        function (result) {
       
          unityInstance.SendMessage("UnityBridge", "GetButtonState", 1);
          let translation = result.translations.get("en");
          unityInstance.SendMessage("UnityBridge", "SendToUnity", translation);

          recognizer.close();
          recognizer = undefined;
        },
        function (err) {
          unityInstance.SendMessage("UnityBridge", "GetButtonState", 1);
          window.console.log(err);
          recognizer.close();
          recognizer = undefined;
        });
}


}