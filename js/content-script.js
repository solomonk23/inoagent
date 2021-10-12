const pattern = /\s*данное сообщение.*иностранного агента\.?\s*/is
const process = node => 
  node.textContent && node.textContent.match(pattern) && (
    node.childNodes && node.childNodes.length ?
      Array.from(node.childNodes).forEach(process)
      : node.textContent = node.textContent.replace(pattern, '')
  )

new MutationObserver(mutations =>
  mutations.forEach(mutation =>
    mutation.target.childNodes.forEach(process) 
  )
).observe(
  document.getElementsByTagName('body')[0], { 
    childList: true, subtree: true, characterData: true 
  }
)
