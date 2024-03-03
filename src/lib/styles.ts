export class StyleInjector {
  private readonly style: string
  public readonly ref: HTMLElement

  constructor (style: string) {
    this.style = style

    const styleElement = document.createElement('style')
    this.ref = styleElement
  }

  public disable () {
    this.ref.innerHTML = ''
    this.ref.remove()
  }

  public enable () {
    this.ref.innerHTML = this.style
    this.ref.appendChild(document.createTextNode(''))
  }
}