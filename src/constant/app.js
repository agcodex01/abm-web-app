const AppConstant = {
  DATE_FORMAT: 'ddd MMM. D , YYYY',
  SUCCESS_MSG: message => ({
    type: 'positive',
    message: message,
    position: 'top'
  }),
  MULTIPART_HEADER: { 'Content-Type': 'multipart/form-data' }
}

export default AppConstant
