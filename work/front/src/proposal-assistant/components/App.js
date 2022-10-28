import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Progress from "./Progress";
import Header from "./Header";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar } from '@fluentui/react';
import autocompleteApi from "../apis/autocomplete";
import officeJsApi from "../apis/officeJs";
import getMessage from "../helpers/getMessage";
import LongTextOption from "./LongTextOption";
import ShortTextOption from "./ShortTextOption";
import ResultsMessage from "./ResultsMessage";

/* global Word, Office */

const MINIMUM_INPUT_LENGTH = 3;

const App = (props) => {
  const [loading, setLoading] = useState(false)
  const [headerOptions, setHeaderOptions] = useState([])
  const [boilerplateOptions, setBoilerplateOptions] = useState([])
  const [inputText, setInputText] = useState('')
  const [autocompletedText, setAutocompletedText] = useState('')

  const { isOfficeInitialized, title } = props;

  useEffect(() => {
    if (isOfficeInitialized) {
      Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, handleDocumentChanged)
    }
    
  }, [isOfficeInitialized])

  useEffect(() => {
    if (autocompletedText) {
      fetchBoilerplate(autocompletedText)
    }
  }, [autocompletedText])

  useEffect(() => {
    if (inputText && autocompletedText !== inputText) {
      setHeaderOptions([])
      setBoilerplateOptions([])
      setAutocompletedText('')
    }
  }, [autocompletedText, inputText])

  async function handleDocumentChanged(event) {
    try {
      const text = await officeJsApi.getTextBeforeCursorLocation()
      const trimmedText = text.trim();
      setInputText(trimmedText)

      if (trimmedText.length > MINIMUM_INPUT_LENGTH) {
        setLoading(true)
        setHeaderOptions([])

        const options = await autocompleteApi.getHeaderSuggestions(trimmedText)
      
        const formattedOptions = options.map(option => {
          return {
            text: option,
            onClick: () => {
              officeJsApi.replaceText({ existingText: text, replacementText: option, fontSize: 18 })
              setAutocompletedText(option)
              setHeaderOptions([])
            }
          }
        })
  
        setHeaderOptions(formattedOptions)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBoilerplate(autocompletedText) {
    try {
      setLoading(true)
      const options = await autocompleteApi.getBoilerplate(autocompletedText)
      const formattedOptions = options.map(option => {
        return {
          text: option,
          onClick: () => {
            officeJsApi.insertText({ text: "\n\n" + option, fontSize: 14 })
            setAutocompletedText('')
            setBoilerplateOptions([])
          }
        }
      })

      setBoilerplateOptions(formattedOptions)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/ey-logo-80.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  const { messageText, messageIcon, messageSpinner } = getMessage({ 
    suggestionsExist: headerOptions.length > 0 || boilerplateOptions.length > 0, 
    textLength: inputText.length,
    minimumTextLength: MINIMUM_INPUT_LENGTH 
  })

  return (
    <div className="proposal-assistant">
      <Header title="Auto Suggestion" />

      <div className="message-bar-container">
        <MessageBar className="suggestions-enabled-message">
            Auto Suggestion is enabled.
        </MessageBar>
      </div>

      <div className="suggestions">

        { loading && <Spinner size={SpinnerSize.large} /> }

        { !loading &&
          <ResultsMessage {...{
            text: messageText,
            icon: messageIcon,
            spinner: messageSpinner
          }}/>
        }

        { boilerplateOptions.length === 0 && 
          headerOptions.map((option, i) => {
            return (
              <ShortTextOption key={`short-text-option-${i}`} {...{
                text: option.text,
                onClick: option.onClick
              }}/>
            )
          })
        }

        {
          boilerplateOptions.map((option, i) => {
            return (
              <LongTextOption key={`long-text-option-${i}`} {...{
                text: option.text,
                onClick: option.onClick
              }}/>
            )
          })
        }
      </div>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;
