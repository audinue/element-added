new MutationObserver(function (mutations) {
  mutations
    .flatMap(function (mutation) {
      return Array.from(mutation.addedNodes)
    })
    .filter(function (node) {
      return node.nodeType === Node.ELEMENT_NODE
    })
    .flatMap(function (element) {
      return [element].concat(Array.from(element.querySelectorAll('*')))
    })
    .filter(function (element, index, array) {
      return array.indexOf(element) === index
    })
    .forEach(function (element) {
      element.dispatchEvent(new CustomEvent('element-added', { bubbles: true }))
    })
}).observe(document, {
  childList: true,
  subtree: true
})
