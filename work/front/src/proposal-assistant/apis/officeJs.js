/* global Word, Office */

async function getTextBeforeCursorLocation() {
    return await Word.run(async (context) => {
        const textBeforeCursor = context.document.getSelection().expandTo(context.document.body.getRange("start"))
        textBeforeCursor.load("text");
        await context.sync();
        
        const paragraphs = textBeforeCursor.text.split("\r")
        const lastParagraph = paragraphs.pop()

        return lastParagraph
    }).catch(err => {
        console.error(err);
    })
};

async function replaceText({ existingText, replacementText, fontSize }) {
    return await Word.run(async (context) => {
      const results = context.document.body.search(existingText, { matchWholeWord: true })
      results.load("items")
      await context.sync();

      const lastRange = results.items.pop()
      
      lastRange.insertText(replacementText, 'replace').font.size = fontSize;

      return replacementText
    }).catch(err => {
      console.error(err);
    })
};

async function insertText({ text, fontSize }) {
  return await Word.run(async (context) => {
    const range = context.document.getSelection().expandTo(context.document.body.getRange("end"))
    
    range.insertText(text, Word.InsertLocation.end).font.size = fontSize || 14;
    await context.sync();

    return text
  }).catch(err => {
    console.log(err.message);
  })
};

  export default {
      getTextBeforeCursorLocation,
      insertText,
      replaceText,
  }