const FileUtil = {
  getFileNameFormContentDisposition: (contentDisposition) => {
    let filename = null
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(contentDisposition)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }

    return filename
  }
}

export default FileUtil
