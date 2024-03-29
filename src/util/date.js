export function formatDate (date, delimeter = '/') {
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}${delimeter}${month}${delimeter}${day}`
}
