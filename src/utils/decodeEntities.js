function decodeEntities (encodedString) {
  const translateRe = /&(nbsp|amp|quot|lt|gt);/g
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>'
  }
  return encodedString
    .replace(translateRe, (match, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 10)))
}
module.exports = decodeEntities
