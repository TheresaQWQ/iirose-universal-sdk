export enum SidebarRoots {
  Navigation = 0,
  Section = 1,
  Shopping = 2,
  Tools = 3,
  Function = 4,
  System = 5,
  Others = 6,
  Box = 7,
  Subscriptions = 8,
  Contacts = 9,
  Message = 10
}

export interface SidebarItemConfig {
  icon: {
    type: 'image' | 'text' | 'custom' | 'iirose',
    image?: string,
    text?: string,
    custom?: string,
    iirose?: string
  },
  title: string,
  onClick: (event: MouseEvent) => void
}

export class SidebarItem {
  private readonly rootTabElement: HTMLElement
  private readonly rootContainerElement: HTMLElement
  private config: SidebarItemConfig
  private ref: HTMLElement

  constructor (target: SidebarRoots, config: SidebarItemConfig) {
    this.rootTabElement = document.querySelectorAll("#functionHolder > div > div.functionButtonGroup")[target] as HTMLElement
    
    const parent = this.rootTabElement.parentElement as HTMLElement
    const childArr = Array.from(parent.children)
    const tabIndex = childArr.indexOf(this.rootTabElement)
    
    this.rootContainerElement = childArr[tabIndex + 1] as HTMLElement

    this.config = config

    this.ref = document.createElement('div')
  }

  public init () {
    this.ref.classList.add("functionButton")
    this.ref.addEventListener('click', this.config.onClick)
    
    const icon = document.createElement('span')

    icon.classList.add("functionBtnIcon")

    if (this.config.icon.type === 'iirose' && this.config.icon.iirose) {
      icon.classList.add(`mdi-${this.config.icon.iirose}`)
    } else if (this.config.icon.type === 'text' && this.config.icon.text) {
      icon.innerText = this.config.icon.text
      icon.style.fontSize = '18px !important'
    } else if (this.config.icon.type === 'custom' && this.config.icon.custom) {
      icon.innerHTML = this.config.icon.custom
    } else if (this.config.icon.type === 'image' && this.config.icon.image) {
      icon.style.backgroundImage = `url(${this.config.icon.image})`
      icon.style.backgroundSize = 'cover'
      icon.style.backgroundPosition = 'center'
      icon.style.backgroundRepeat = 'no-repeat'
    }

    icon.style.width = '24px'
    icon.style.height = '24px'

    this.ref.appendChild(icon)

    const title = document.createElement('span')

    title.classList.add('functionBtnFont')
    title.innerText = this.config.title

    this.ref.appendChild(title)

    this.rootContainerElement.appendChild(this.ref)
  }

  public destroy () {
    this.ref.remove()
  }

  get element () {
    return this.ref
  }
}

// @ts-ignore
if (module.hot) module.hot.accept();
