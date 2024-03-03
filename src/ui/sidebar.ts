export enum SidebarRoots {
  Navigation = '#functionHolder > div > div:nth-child(2)',
  Section = '#functionHolder > div > div:nth-child(4)',
  Shopping = '#functionHolder > div > div:nth-child(6)',
  Tools = '#functionHolder > div > div:nth-child(8)',
  Function = '#functionHolder > div > div:nth-child(10)',
  System = '#functionHolder > div > div:nth-child(12)',
  Others = '#functionHolder > div > div:nth-child(14)',
  Box = '#functionHolder > div > div:nth-child(16)',
  Subscriptions = '#functionHolder > div > div:nth-child(18)',
  Contacts = '#functionHolder > div > div:nth-child(20)',
  Message = '#functionHolder > div > div:nth-child(22)'
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
    this.rootTabElement = document.querySelector(target) as HTMLElement
    
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

  get element () {
    return this.ref
  }
}

// @ts-ignore
if (module.hot) module.hot.accept();