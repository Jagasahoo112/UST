function getFileName(filePath) {
  if (filePath) {
    const nameWithSuffix = filePath.split("/").pop();
    return nameWithSuffix;
  } else {
    return "";
  }
}

function getFileType(filePath) {
  if (filePath) {
    const nameWithSuffix = filePath.split("/").pop();
    const type = nameWithSuffix.split(".").pop();
    return type;
  } else {
    return "";
  }
}

export { getFileName, getFileType };
