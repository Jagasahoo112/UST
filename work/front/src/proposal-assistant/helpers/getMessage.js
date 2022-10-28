function getMessage({ suggestionsExist, textLength, minimumTextLength }) {
    if (suggestionsExist) {
      return { messageText: "Click on the suggestions below to accept", messageIcon: null }
    } else if (!suggestionsExist && textLength === 0) {
      return { messageText: "Start typing in the document to view suggestions.", messageIcon: null }
    } else if (!suggestionsExist && textLength > 0 && textLength <= minimumTextLength) {
      return { messageText: "Continue typing, we are searching for suggestions.", messageIcon: null, messageSpinner: true }
    } else if (!suggestionsExist && textLength > 0 && textLength > minimumTextLength) {
      return { messageText: "We could not find any matches, please try typing a different phrase.", messageIcon: "broken-robot.png" }
    } else {
      return { messageText: '', messageIcon: null }
    }
}

export default getMessage;