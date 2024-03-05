export enum FacePanelType {
  RecentUsed = 0,
  Kaomoji = 1,
  Emoji = 2,
  Faces = 3,
  Favorites = 4,
  CustomPanel = 6
}

export interface FacePanelConfig {
  title: string,
  type: FacePanelType
}

export class FacePanel {
  private root: HTMLElement;
  private config: FacePanelConfig;
  public refs: {
    pagination: HTMLElement,
    panel: HTMLElement
  }

  constructor (config: FacePanelConfig) {
    this.config = config

    this.root = document.querySelector(`.emojiContentBox[index="${this.config.type}"]`) as HTMLElement
    this.refs = {
      pagination: document.createElement('span'),
      panel: document.createElement('div')
    }
  }

  private getCurrentItemCount () {
    const pagination = Array.from((this.root.querySelector(".emojiPage") as HTMLElement).children)
    return pagination.length
  }

  public init () {
    this.root = document.querySelector(`.emojiContentBox[index="${this.config.type}"]`) as HTMLElement

    const pIndex = this.getCurrentItemCount().toString()

    // 初始化分页器
    this.refs.pagination.classList.add("faceHolderPageItem")
    this.refs.pagination.innerText = this.config.title

    // this.refs.pagination.setAttribute('p', pIndex)
    // this.refs.pagination.setAttribute("build", "1")

    const pagination = this.root.querySelector(".emojiPage") as HTMLElement

    pagination.appendChild(this.refs.pagination)

    // 面板
    this.refs.panel.classList.add("faceHolderBoxChild", "textColor", "panelHolderItem")

    // this.refs.panel.setAttribute("p", pIndex)
    // this.refs.panel.setAttribute("index", pIndex)

    const panel = this.root.querySelector(".emojiContent") as HTMLElement

    panel.appendChild(this.refs.panel)

    this.refs.pagination.addEventListener('click', () => {
      this.active()
    })
    
    pagination.childNodes.forEach(e => {
      e.addEventListener('click', () => {
        if (e !== this.refs.pagination) this.deactivate()
      })
    })

    this.deactivate()
  }

  private active () {
    this.refs.pagination.style.color = 'rgb(0, 0, 0)'
    this.refs.pagination.style.background = 'rgb(240, 240, 240)'

    this.refs.panel.style.transform = ''
    this.refs.panel.style.display = 'block'

    // @ts-ignore
    window.Utils.Sound.play(8)

    const buttons = Array.from((this.root.querySelector('.emojiPage') as HTMLElement).children)

    buttons.forEach((e: any) => {
      if (e !== this.refs.pagination) {
        e.style.color = ''
        e.style.background = 'transport'
        e.style.backgroundColor = ''
      }
    })

    const panels = Array.from((this.root.querySelector('.emojiContent') as HTMLElement).children)

    panels.forEach((e: any) => {
      if (e !== this.refs.panel) {
        e.style.transform = 'translateX(-10%)'
        e.style.display = 'none'
      }
    })
  }

  private deactivate () {
    this.refs.pagination.style.color = ''
    this.refs.pagination.style.background = 'transport'
    this.refs.pagination.style.backgroundColor = ''

    this.refs.panel.style.transform = 'translateX(10%)'
    this.refs.panel.style.display = 'none'
  }

  public destroy () {
    this.refs.pagination.remove()
    this.refs.panel.remove()
  }
}