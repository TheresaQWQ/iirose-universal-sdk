export const icons: string[] = []

export const init = async () => {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[]
  const target = links.find(item => item.href.includes('materialdesignicons')) as HTMLLinkElement

  const style = await fetch(target.href).then(response => response.text())

  const list: string[] = []

  // .mdi-xxxx-xxxx::before
  const regex = /\.mdi-(.*)::before/

  style.split("{").forEach(item => {
    const className = item.split("}")[1]
    if (className) {
      const match = regex.exec(className)
      if (match) {
        list.push(match[1])
      }
    }
  })

  icons.push(...list)
}

// @ts-ignore
if (module.hot) module.hot.accept();