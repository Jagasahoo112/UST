function initSpeechRecognition() {
    // status fields and start button in UI
  
    var phraseDiv;
    var startRecognizeOnceAsyncButton;
    var stopRecognizeOnceAsyncButton;
    // var startContinousRecognizeOnceAsyncButton;
    // var start1RecognizeOnceAsyncButton;
  
    // subscription key and region for speech services.
    var subscriptionKey,
      serviceRegion,
      languageTargetOptions,
      languageSourceOptions;
    var SpeechSDK;
    var recognizer;
  
    // startContinousRecognizeOnceAsyncButton = document.getElementById("startContinousRecognizeOnceAsyncButton");
    startRecognizeOnceAsyncButton = document.getElementById(
      "startRecognizeOnceAsyncButton"
    );
    stopRecognizeOnceAsyncButton = document.getElementById(
      "stopRecognizeOnceAsyncButton"
    );
    stopRecognizeOnceAsyncButton.hidden = true;
    var isContinuous = false;
    subscriptionKey = document.getElementById("subscriptionKey");
    serviceRegion = document.getElementById("serviceRegion");
    languageTargetOptions = document.getElementById("languageTargetOptions");
    languageSourceOptions = document.getElementById("languageSourceOptions");
    phraseDiv = document.getElementById("phraseDiv");
    resetButton = document.getElementById("resetFields");
    resetButton.disabled = true;
  
    contoptions = document.getElementById("contoptions");
    // startContinousRecognizeOnceAsyncButton.addEventListener("click", function () {
    //   startContinousRecognizeOnceAsyncButton.disabled = true;
    //   stopRecognizeOnceAsyncButton.disabled = false;
    //   phraseDiv.innerHTML = "";
  
    //   if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
    //     alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
    //     startContinousRecognizeOnceAsyncButton.disabled = false;
    //     return;
    //   }
    //   var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
  
    //   speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
    //   let language = languageTargetOptions.value
    //   speechConfig.addTargetLanguage(language)
  
    //   var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  
    //   ////////////////////////////////////
    //   recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  
    //   recognizer.startContinuousRecognitionAsync();
  
    //   recognizer.recognizing = function(recognizer,SpeechSimplePhraseEvent){
    //       // console.log(language);
    //       // let translation = result.translations.get(language);
    //       console.log('My object: ', SpeechSimplePhraseEvent.privResult.privText);
    //       let translation = SpeechSimplePhraseEvent.privResult.privText;
    //       translation = '\n'+translation+'\n'
    //       phraseDiv.innerHTML += translation;
    //       // console.log(SpeechSimplePhraseEvent);
    //   },
  
    //     function (err) {
    //       startContinousRecognizeOnceAsyncButton.disabled = false;
    //       phraseDiv.innerHTML += err;
    //       window.console.log(err);
  
    //       recognizer.close();
    //       recognizer = undefined;
    //     };
  
    // });
  
    stopRecognizeOnceAsyncButton.addEventListener("click", function () {
      recognizer.stopContinuousRecognitionAsync();
      resetButton.disabled = false;
      // startContinousRecognizeOnceAsyncButton.disabled = false;
      // stopRecognizeOnceAsyncButton.disabled = true;
      stopRecognizeOnceAsyncButton.hidden = true;
      startRecognizeOnceAsyncButton.disabled = false;
      // phraseDiv.innerHTML = "";
    });
  
    startRecognizeOnceAsyncButton.addEventListener("click", function () {
      contoptions.disabled = true;
      if (contoptions.value === "cont") {
        continuousDetection();
        isContinuous = true;
      } else {
        resetButton.disabled = false;
        staticDetection();
      }
    });
    resetButton.addEventListener("click", function () {
      contoptions.disabled = false;
      if (isContinuous === true) {
        startRecognizeOnceAsyncButton.hidden = false;
        stopRecognizeOnceAsyncButton.hidden = true;
        // console.log("here");
        recognizer.stopContinuousRecognitionAsync();
        isContinuous = false;
      }
      // start1RecognizeOnceAsyncButton.disabled = false;
      startRecognizeOnceAsyncButton.disabled = false;
      // stopRecognizeOnceAsyncButton.disabled = true;
      resetButton.disabled = true;
      // console.log("Reset");
      document.getElementById("languageSourceOptions").value = "en-US";
      document.getElementById("languageTargetOptions").value = "en";
  
      contoptions.value = "cont";
      phraseDiv.innerHTML = "";
    });
    function staticDetection() {
      // console.log("static voice reading beginning.");
      startRecognizeOnceAsyncButton.disabled = true;
      // stopRecognizeOnceAsyncButton.disabled = false;
      // phraseDiv.innerHTML = "";
  
      if (
        subscriptionKey.value === "" ||
        subscriptionKey.value === "subscription"
      ) {
        alert(
          "Please enter your Microsoft Cognitive Services Speech subscription key!"
        );
        startRecognizeOnceAsyncButton.disabled = false;
        return;
      }
      var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
        subscriptionKey.value,
        serviceRegion.value
      );
  
      speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
      let language = languageTargetOptions.value;
      speechConfig.addTargetLanguage(language);
  
      var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  
      recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
      recognizer.continuous = true;
      recognizer.recognizeOnceAsync(
        function (result) {
          startRecognizeOnceAsyncButton.disabled = false;
  
          let translation = result.translations.get(language);
          // window.console.log(translation);
          text = phraseDiv.innerHTML;
          trimmed = text.trim();
          if (trimmed.length !== 0) {
            phraseDiv.innerHTML += " ";
          }
          phraseDiv.innerHTML += translation;
  
          recognizer.close();
          recognizer = undefined;
        },
        function (err) {
          startRecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += err;
          // window.console.log(err);
  
          recognizer.close();
          recognizer = undefined;
        }
      );
    }
  
    function continuousDetection() {
      startRecognizeOnceAsyncButton.hidden = true;
      // console.log("text");
      stopRecognizeOnceAsyncButton.hidden = false;
      // phraseDiv.innerHTML = "";
      let startText = phraseDiv.innerHTML;
      let previousT = " ";
  
      if (
        subscriptionKey.value === "" ||
        subscriptionKey.value === "subscription"
      ) {
        alert(
          "Please enter your Microsoft Cognitive Services Speech subscription key!"
        );
        startRecognizeOnceAsyncButton.disabled = false;
        return;
      }
  
      var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
        subscriptionKey.value,
        serviceRegion.value
      );
  
      speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
      let language = languageTargetOptions.value;
      speechConfig.addTargetLanguage(language);
  
      var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  
      recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
      // recognizer.continuous = true;
      recognizer.startContinuousRecognitionAsync();
      // console.log(recognizer);
      // previousT = "hello";
      (recognizer.recognizing = (s, e) => {
        // console.log(recognizer);
        // console.log(e);
  
        let translation = e.privResult.privTranslations.privMap.privValues;
  
        let hasSpace = false;
        translation = "\n" + translation + "\n";
        for (var i = 0; i < translation.length; i++) {
          if (translation[i] === " ") {
            hasSpace = true;
          }
        }
        if (hasSpace === false) {
          text = phraseDiv.innerHTML;
          trimmed = text.trim();
          if (trimmed.length !== 0) {
            startText = phraseDiv.innerHTML + ". ";
          } else {
            startText = phraseDiv.innerHTML;
          }
        }
        // console.log(translation);
        phraseDiv.innerHTML = startText + translation;
  
        // startRecognizeOnceAsyncButton.disabled = false;
        // let translation = e.translations.get(language);
        // window.console.log(translation);
        // phraseDiv.innerHTML += translation;
  
        // recognizer.close();
        // recognizer = undefined;
      }),
        function (err) {
          start1RecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += err;
          window.console.log(err);
  
          recognizer.close();
          recognizer = undefined;
        };
    }
  
    if (!!window.SpeechSDK) {
      SpeechSDK = window.SpeechSDK;
      // startContinousRecognizeOnceAsyncButton.disabled = false;
      stopRecognizeOnceAsyncButton.hidden = true;
  
      // document.getElementById("content").style.display = "block";
      // document.getElementById("warning").style.display = "none";
    }
  }
  
  //==================================================================================
  function speechRecognitionForQuestionAnswring() {
    // status fields and start button in UI
    var phraseDiv;
    var startRecognizeOnceAsyncButton;
    var stopRecognizeOnceAsyncButton;
    var subscriptionKey,
      serviceRegion,
      languageTargetOptions,
      languageSourceOptions;
    var SpeechSDK;
    var recognizer;
  
    window.setTimeout(function () {
      // startContinousRecognizeOnceAsyncButton = document.getElementById("startContinousRecognizeOnceAsyncButton");
      startRecognizeOnceAsyncButton = document.getElementById(
        "startRecognizeOnceAsyncButton"
      );
      stopRecognizeOnceAsyncButton = document.getElementById(
        "stopRecognizeOnceAsyncButton"
      );
      stopRecognizeOnceAsyncButton.hidden = true;
      var isContinuous = false;
      subscriptionKey = document.getElementById("subscriptionKey");
      serviceRegion = document.getElementById("regionOptions");
      languageTargetOptions = document.getElementById("languageTargetOptions");
      languageSourceOptions = document.getElementById("languageSourceOptions");
      phraseDiv = document.getElementById("sourceTextArea");
      contoptions = document.getElementById("contoptions");
  
      stopRecognizeOnceAsyncButton.addEventListener("click", function () {
        recognizer.stopContinuousRecognitionAsync();
        stopRecognizeOnceAsyncButton.hidden = true;
        startRecognizeOnceAsyncButton.disabled = false;
        startRecognizeOnceAsyncButton.hidden = false;
      });
  
      startRecognizeOnceAsyncButton.addEventListener("click", function () {
        continuousDetection();
      });
  
      function staticDetection() {
        startRecognizeOnceAsyncButton.disabled = true;
        if (
          subscriptionKey.value === "" ||
          subscriptionKey.value === "subscription"
        ) {
          alert(
            "Please enter your Microsoft Cognitive Services Speech subscription key!"
          );
          startRecognizeOnceAsyncButton.disabled = false;
          return;
        }
  
        var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
          subscriptionKey.value,
          serviceRegion.value
        );
  
        speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
        let language = languageTargetOptions.value;
        speechConfig.addTargetLanguage(language);
  
        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  
        recognizer = new SpeechSDK.TranslationRecognizer(
          speechConfig,
          audioConfig
        );
        recognizer.continuous = true;
        recognizer.recognizeOnceAsync(
          function (result) {
            startRecognizeOnceAsyncButton.disabled = false;
            if (result.translations !== undefined) {
              let translation = result.translations.get(language);
              // window.console.log(translation);
              text = phraseDiv.value;
              trimmed = text.trim();
  
              if (trimmed.length !== 0) {
                phraseDiv.value += " ";
              }
              phraseDiv.value += translation;
            } else {
              phraseDiv.value += " ";
            }
  
            recognizer.close();
            recognizer = undefined;
          },
          function (err) {
            startRecognizeOnceAsyncButton.disabled = false;
            phraseDiv.value += err;
            // window.console.log(err);
  
            recognizer.close();
            recognizer = undefined;
          }
        );
      }
  
      function continuousDetection() {
        startRecognizeOnceAsyncButton.hidden = true;
        // console.log("text");
        stopRecognizeOnceAsyncButton.hidden = false;
        // phraseDiv.innerHTML = "";
        let startText = phraseDiv.value;
        let previousT = " ";
  
        if (
          subscriptionKey.value === "" ||
          subscriptionKey.value === "subscription"
        ) {
          alert(
            "Please enter your Microsoft Cognitive Services Speech subscription key!"
          );
          startRecognizeOnceAsyncButton.disabled = false;
          return;
        }
        // window.console.log(serviceRegion.value);
        // window.console.log(subscriptionKey);
        var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
          subscriptionKey.value,
          serviceRegion.value
        );
  
        speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
        let language = languageTargetOptions.value;
        speechConfig.addTargetLanguage(language);
  
        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  
        recognizer = new SpeechSDK.TranslationRecognizer(
          speechConfig,
          audioConfig
        );
        // recognizer.continuous = true;
        recognizer.startContinuousRecognitionAsync();
        // console.log(recognizer);
        // previousT = "hello";
        (recognizer.recognizing = (s, e) => {
          // console.log(recognizer);
          // console.log(e);
  
          let translation = e.privResult.privTranslations.privMap.privValues;
          console.log("translation.... ", translation);
          let hasSpace = false;
          translation = "\n" + translation + "\n";
          for (var i = 0; i < translation.length; i++) {
            if (translation[i] === " ") {
              hasSpace = true;
            }
          }
          if (hasSpace === false) {
            text = phraseDiv.value;
            trimmed = text.trim();
            if (trimmed.length !== 0) {
              startText = phraseDiv.value + ". ";
            } else {
              startText = phraseDiv.value;
            }
          }
          phraseDiv.value = startText + translation;
        }),
          function (err) {
            start1RecognizeOnceAsyncButton.disabled = false;
            phraseDiv.value += err;
            window.console.log(err);
  
            recognizer.close();
            recognizer = undefined;
          };
      }
  
      if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
        stopRecognizeOnceAsyncButton.hidden = true;
      }
    });
  }
  

//==================================================================================
function speechRecognitionForAskingQuestion() {

    // status fields and start button in UI
    var phraseDiv;
    var startRecognizeOnceAsyncButton;
    var stopRecognizeOnceAsyncButton;
    var subscriptionKey,
        serviceRegion,
        languageTargetOptions,
        languageSourceOptions;
    var SpeechSDK;
    var recognizer;

    window.setTimeout(function () {
        // startContinousRecognizeOnceAsyncButton = document.getElementById("startContinousRecognizeOnceAsyncButton");
        startRecognizeOnceAsyncButton = document.getElementById(
            "startRecognizeOnceAsyncButton"
        );
        stopRecognizeOnceAsyncButton = document.getElementById(
            "stopRecognizeOnceAsyncButton"
        );
        stopRecognizeOnceAsyncButton.hidden = true;
        var isContinuous = false;
        subscriptionKey = document.getElementById("subscriptionKey");
        serviceRegion = document.getElementById("regionOptions");
        languageTargetOptions = document.getElementById("languageTargetOptions");
        languageSourceOptions = document.getElementById("languageSourceOptions");
        phraseDiv = document.getElementById("sourceTextArea");
        contoptions = document.getElementById("contoptions");


        stopRecognizeOnceAsyncButton.addEventListener("click", function () {
            recognizer.stopContinuousRecognitionAsync();
            stopRecognizeOnceAsyncButton.hidden = true;
            startRecognizeOnceAsyncButton.disabled = false;
            startRecognizeOnceAsyncButton.hidden = false;
        });

        startRecognizeOnceAsyncButton.addEventListener("click", function () {
            continuousDetection();
        });

        function staticDetection() {

            startRecognizeOnceAsyncButton.disabled = true;
            if (
                subscriptionKey.value === "" ||
                subscriptionKey.value === "subscription"
            ) {
                alert(
                    "Please enter your Microsoft Cognitive Services Speech subscription key!"
                );
                startRecognizeOnceAsyncButton.disabled = false;
                return;
            }

            var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
                subscriptionKey.value,
                serviceRegion.value
            );

            speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
            let language = languageTargetOptions.value;
            speechConfig.addTargetLanguage(language);

            var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

            recognizer = new SpeechSDK.TranslationRecognizer(
                speechConfig,
                audioConfig
            );
            recognizer.continuous = true;
            recognizer.recognizeOnceAsync(
                function (result) {

                    startRecognizeOnceAsyncButton.disabled = false;
                    if (result.translations !== undefined) {
                        let translation = result.translations.get(language);
                        // window.console.log(translation);
                        text = phraseDiv.value;
                        trimmed = text.trim();

                        if (trimmed.length !== 0) {
                            phraseDiv.value += " ";
                        }
                        phraseDiv.value += translation;
                    } else {
                        phraseDiv.value += " ";
                    }


                    recognizer.close();
                    recognizer = undefined;
                },
                function (err) {
                    startRecognizeOnceAsyncButton.disabled = false;
                    phraseDiv.value += err;
                    // window.console.log(err);

                    recognizer.close();
                    recognizer = undefined;
                }
            );
        }

        function continuousDetection() {
            startRecognizeOnceAsyncButton.hidden = true;
            // console.log("text");
            stopRecognizeOnceAsyncButton.hidden = false;
            // phraseDiv.innerHTML = "";
            let startText = phraseDiv.value;
            let previousT = " ";

            if (
                subscriptionKey.value === "" ||
                subscriptionKey.value === "subscription"
            ) {
                alert(
                    "Please enter your Microsoft Cognitive Services Speech subscription key!"
                );
                startRecognizeOnceAsyncButton.disabled = false;
                return;
            }

            var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
                subscriptionKey.value,
                serviceRegion.value
            );

            speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
            let language = languageTargetOptions.value;
            speechConfig.addTargetLanguage(language);

            var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

            recognizer = new SpeechSDK.TranslationRecognizer(
                speechConfig,
                audioConfig
            );
            // recognizer.continuous = true;
            recognizer.startContinuousRecognitionAsync();
            // console.log(recognizer);
            // previousT = "hello";
            (recognizer.recognizing = (s, e) => {
                // console.log(recognizer);
                // console.log(e);

                let translation = e.privResult.privTranslations.privMap.privValues;
                console.log("translation.... ", translation)
                let hasSpace = false;
                translation = "\n" + translation + "\n";
                for (var i = 0; i < translation.length; i++) {
                    if (translation[i] === " ") {
                        hasSpace = true;
                    }
                }
                if (hasSpace === false) {
                    text = phraseDiv.value;
                    trimmed = text.trim();
                    if (trimmed.length !== 0) {
                        startText = phraseDiv.value + ". ";
                    } else {
                        startText = phraseDiv.value;
                    }
                }
                phraseDiv.value = startText + translation;
            }),
                function (err) {
                    start1RecognizeOnceAsyncButton.disabled = false;
                    phraseDiv.value += err;
                    window.console.log(err);

                    recognizer.close();
                    recognizer = undefined;
                };
        }

        if (!!window.SpeechSDK) {
            SpeechSDK = window.SpeechSDK;
            stopRecognizeOnceAsyncButton.hidden = true;
        }
    });
}