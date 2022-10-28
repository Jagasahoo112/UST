const fileTypes = {
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  docm: "application/vnd.ms-word.document.macroEnabled.12",
};

function createFile({ fileData, fileName, fileType }) {
  const type = fileTypes[fileType];

  const file = new File(
    [new Uint8Array(fileData)],
    "test.docx", // keeping this .docx right now because the current backend doesn't allow docm
    { type }
  );

  return file;
}

export default createFile;
