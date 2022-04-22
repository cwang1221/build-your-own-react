const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const Didact = {
  createElement: (type, props, ...children) => {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          switch (typeof child) {
          case 'object':
            return child
          case 'string':
            return createTextElement(child)
          }
        })
      }
    }
  },
  render: (element, container) => {
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)

    Object.keys(element.props)
      .filter(key => key !== 'children')
      .forEach(key => dom[key] = element.props[key])

    element.props.children.forEach(child => Didact.render(child, dom))

    container.appendChild(dom)
  }
}

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from Didact</h2>
  </div>
)

const container = document.getElementById('root')
Didact.render(element, container)

