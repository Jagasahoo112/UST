function speechRecognitionForQuestionAnswering(speechRecognitionCallback) {
  
  //authorization tokens for your subscription.
  var authorizationEndpoint = "token.php";
  function RequestAuthorizationToken() {
    if (authorizationEndpoint) {
      var a = new XMLHttpRequest();
      a.open("GET", authorizationEndpoint);
      a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      a.send("");
      a.onload = function () {
        var token = JSON.parse(atob(this.responseText.split(".")[1]));
        serviceRegion.value = token.region;
        authorizationToken = this.responseText;
        subscriptionKey.disabled = true;
        subscriptionKey.value = "using authorization token (hit F5 to refresh)";
        console.log("Got an authorization token: " + token);
      };
    }
  }

  // On document load resolve the Speech SDK dependency
  function Initialize(onComplete) {
    if (!!window.SpeechSDK) {
      onComplete(window.SpeechSDK);
      getVoiceList();
      
    }
  }
  function getVoiceList() {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://" +
        regionOptions.value +
        ".tts.speech." +
        (regionOptions.value.startsWith("china")
          ? "azure.cn"
          : "microsoft.com") +
        "/cognitiveservices/voices/list",
      true
    );
    if (authorizationToken) {
      request.setRequestHeader("Authorization", "Bearer " + authorizationToken);
    } else {
      if (
        subscriptionKey.value === "" ||
        subscriptionKey.value === "subscription"
      ) {
        alert(
          "Please enter your Microsoft Cognitive Services Speech subscription key!"
        );
        return;
      }
      request.setRequestHeader(
        "Ocp-Apim-Subscription-Key",
        subscriptionKey.value
      );
    }

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        const response = this.response;
        const neuralSupport = response.indexOf("JessaNeural") > 0;
        const defaultVoice = neuralSupport ? "JessaNeural" : "JessaRUS";
        let selectId;
        const data = JSON.parse(response);
        voiceOptions.innerHTML = "";
        data.forEach((voice, index) => {
          let voiceName = voice.Name;
          let name = voiceName.substring(
            voiceName.indexOf(",") + 2,
            voiceName.length - 1
          );
          name = name.replace(/([a-z])([A-Z])/g, "$1-$2");
          let countryCode = voiceName.substring(
            voiceName.indexOf("(") + 1,
            voiceName.indexOf(",")
          );
          let finalName = name + "(" + countryCode + ")";
          voiceOptions.innerHTML +=
            '<option value="' + voice.Name + '">' + finalName + "</option>";
          if (voice.Name.indexOf(defaultVoice) > 0) {
            selectId = index;
          }
        });
        voiceOptions.selectedIndex = selectId;
        voiceOptions.disabled = false;
      } else {
        //window.console.log(this);
        //eventsDiv.innerHTML += "cannot get voice list, code: " + this.status + " detail: " + this.statusText + "\r\n";
      }
    };

    request.send();
  }
  console.log("variable declaration");
  // status fields and start button in UI
 // var resultsDiv, eventsDiv;
  //var highlightDiv;
  var startSynthesisAsyncButton;
  var updateVoiceListButton;
  var audioFinished = false;
  var audioFinishedCheck = false;

  // subscription key and region for speech services.
  var subscriptionKey, regionOptions;
  var authorizationToken;
  var voiceOptions, isSsml;
  var SpeechSDK;
  var synthesisText;
  var synthesizer;
  var player;
  var wordBoundaryList = [];
  //var stopButton;

  //document.addEventListener("DOMContentLoaded", function () {
  window.setTimeout(function () {
    console.log("set timeout");
    startSynthesisAsyncButton = document.getElementById(
      "startSynthesisAsyncButton"
    );
    updateVoiceListButton = document.getElementById("updateVoiceListButton");
    //pauseButton = document.getElementById("pauseButton");
    //stopButton = document.getElementById("stopButton");
    //resumeButton = document.getElementById("resumeButton");
    subscriptionKey = document.getElementById("subscriptionKey");
    regionOptions = document.getElementById("regionOptions");
    //resultsDiv = document.getElementById("resultsDiv");
    //eventsDiv = document.getElementById("eventsDiv");
    voiceOptions = document.getElementById("voiceOptions");
    isSsml = document.getElementById("isSSML");
   // highlightDiv = document.getElementById("highlightDiv");
    var slider = document.getElementById("speed");
    var currentPathname;

    setInterval(function () {
      // if (player !== undefined) {
      //   const currentTime = player.currentTime;
      //   var wordBoundary;
      //   for (const e of wordBoundaryList) {
      //     if (currentTime * 1000 > e.audioOffset / 10000) {
      //       wordBoundary = e;
      //     } else {
      //       break;
      //     }
      //   }
      //   if (wordBoundary !== undefined) {
      //     let htmlText =
      //       synthesisText.substr(0, wordBoundary.textOffset) +
      //       "<span class='bg-warning'>" +
      //       wordBoundary.text +
      //       "</span>" +
      //       synthesisText.substr(
      //         wordBoundary.textOffset + wordBoundary.wordLength
      //       );
      //     let displayHtml = `<div >${htmlText}</div>`;
      //     $("#synthesisText").trumbowyg("html", displayHtml);
      //     audioFinishedCheck = false;
      //   } else {
      //     if (audioFinished === true && audioFinishedCheck === false) {
      //       audioFinishedCheck = true;
      //       let htmlText = synthesisText;
      //       let displayHtml = `<div >${htmlText}</div>`;
      //       $("#synthesisText").trumbowyg("html", displayHtml);
      //     }
      //   }
      // }
      currentPathname = "/" + window.location.hash;
      if (currentPathname != "/#/demos/question-answering") {
        if (player !== undefined) {
          player.pause();
          player = new SpeechSDK.SpeakerAudioDestination();
          audioFinishedCheck = false;
          audioFinished = true;
          //startSynthesisAsyncButton.style.display = "block";
          synthesisText = "";
        }
      }
    }, 50);

    // pauseButton.addEventListener("click", function () {
    //   player.pause();
    //  // startSynthesisAsyncButton.style.display = "none";
      
    // });
   var stopPlay =  function () {
      if (player !== undefined) {
        player.pause();
        player = new SpeechSDK.SpeakerAudioDestination();
        audioFinishedCheck = false;
        audioFinished = true;
        //startSynthesisAsyncButton.style.display = "block";
       
      }
    };

    // resumeButton.addEventListener("click", function () {
    //   player.resume();
    //  // startSynthesisAsyncButton.style.display = "none";
    
    // });

    //startSynthesisAsyncButton.addEventListener("click", function () {
    var playText =  function (text) {
      //startSynthesisAsyncButton.style.display = "none";
     
      wordBoundaryList = [];

      //synthesisText = document.getElementById("synthesisText").value;
      synthesisText = text;
      // if we got an authorization token, use the token. Otherwise use the provided subscription key
      var speechConfig;
      if (authorizationToken) {
        speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
          authorizationToken,
          serviceRegion.value
        );
      } else {
        if (
          subscriptionKey.value === "" ||
          subscriptionKey.value === "subscription"
        ) {
          alert(
            "Please enter your Microsoft Cognitive Services Speech subscription key!"
          );
          return;
        }
        speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
          subscriptionKey.value,
          regionOptions.value
        );
      }

      speechConfig.speechSynthesisVoiceName = voiceOptions.value;
      // The SDK uses Media Source Extensions (https://www.w3.org/TR/media-source/) for playback.
      // Mp3 format is supported in most browsers.
      speechConfig.speechSynthesisOutputFormat =
        SpeechSDK.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
      //speechConfig.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3;
      player = new SpeechSDK.SpeakerAudioDestination();
      player.onAudioEnd = function (_) {
        window.console.log("playback finished");
        ////////======================================================================================================================================
        
        audioFinished = true;
        

        wordBoundaryList = [];
      };

      var audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

      synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
      // The event synthesizing signals that a synthesized audio chunk is received.
      // You will receive one or more synthesizing events as a speech phrase is synthesized.
      // You can use this callback to streaming receive the synthesized audio.
      synthesizer.synthesizing = function (s, e) {
        // window.console.log(e);
        // eventsDiv.innerHTML += "(synthesizing) Reason: " + SpeechSDK.ResultReason[e.result.reason] +
        //        "Audio chunk length: " + e.result.audioData.byteLength + "\r\n";
      };

      // The synthesis started event signals that the synthesis is started.
      synthesizer.synthesisStarted = function (s, e) {
        //window.console.log(e);
        // eventsDiv.innerHTML += "(synthesis started)" + "\r\n";

        //startSynthesisAsyncButton.style.display = "none";
       // pauseButton.style.display = "block";
       // resumeButton.style.display = "none";

        // pauseButton.disabled = false;
      };

      // The event synthesis completed signals that the synthesis is completed.
      synthesizer.synthesisCompleted = function (s, e) {
        //console.log(e);
        // eventsDiv.innerHTML += "(synthesized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] +
        //         " Audio length: " + e.result.audioData.byteLength + "\r\n";
      };

      // The event signals that the service has stopped processing speech.
      // This can happen when an error is encountered.
      synthesizer.SynthesisCanceled = function (s, e) {
        const cancellationDetails = SpeechSDK.CancellationDetails.fromResult(
          e.result
        );
        let str =
          "(cancel) Reason: " +
          SpeechSDK.CancellationReason[cancellationDetails.reason];
        if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
          str += ": " + e.result.errorDetails;
        }
        //window.console.log(e);
        // eventsDiv.innerHTML += str + "\r\n";

        //startSynthesisAsyncButton.style.display = "block";
        //pauseButton.style.display = "none";
        //resumeButton.style.display = "none";
      };

      // This event signals that word boundary is received. This indicates the audio boundary of each word.
      // The unit of e.audioOffset is tick (1 tick = 100 nanoseconds), divide by 10,000 to convert to milliseconds.
      synthesizer.wordBoundary = function (s, e) {
        //eventsDiv.innerHTML += "(WordBoundary), Text: " + e.text + ", Audio offset: " + e.audioOffset / 10000 + "ms." + "\r\n";
        wordBoundaryList.push(e);
      };

      const complete_cb = function (result) {
        if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          // resultsDiv.innerHTML += "synthesis finished";
        } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
          // resultsDiv.innerHTML += "synthesis failed. Error detail: " + result.errorDetails;
        }
        // window.console.log(result);
        synthesizer.close();
        synthesizer = undefined;
      };
      const err_cb = function (err) {
       // startSynthesisAsyncButton.disabled = false;
        phraseDiv.innerHTML += err;
        //window.console.log(err);
        synthesizer.close();
        synthesizer = undefined;
      };

      let voiceName = voiceOptions.value;
      
      let name = voiceName.substring(
        voiceName.indexOf(",") + 2,
        voiceName.length - 1
      );
      let countryCode = voiceName.substring(
        voiceName.indexOf("(") + 1,
        voiceName.indexOf(",")
      );
     // let finalName = countryCode + "-" + name;
      let finalName = "en-US-JennyNeural";
      // console.log("Output: ", synthesisText);
      synthesisText =
        '<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="' +
        finalName +
        '"><prosody rate="' +
        slider.value +
        '%" pitch="0%">' +
        synthesisText +
        "</prosody></voice></speak>";
      if (isSsml.checked) {
        synthesizer.speakSsmlAsync(synthesisText, complete_cb, err_cb);
      } else {
        synthesizer.speakTextAsync(synthesisText, complete_cb, err_cb);
      }
    };

    Initialize(function (speechSdk) {
      SpeechSDK = speechSdk;
      if (typeof RequestAuthorizationToken === "function") {
        // RequestAuthorizationToken();
      }
    });
    speechRecognitionCallback(playText,stopPlay);
  });


  }
  