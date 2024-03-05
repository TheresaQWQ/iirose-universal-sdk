import { StyleInjector } from "../lib/styles"
import window from './css/window.module.css'

export interface WebWindowConfig {
  title: string,
  icon: {
    type: 'image' | 'text' | 'custom' | 'iirose',
    image?: string,
    text?: string,
    custom?: string,
    iirose?: string
  },
  size: {
    resize: boolean,
    width: number,
    height: number
  },
  id: string
}

export class WebWindow {
  private config: WebWindowConfig
  private styleInjector: StyleInjector
  public refs: {
    root: HTMLElement,
    header: HTMLElement,
    body: HTMLElement
  }

  constructor (config: WebWindowConfig) {
    this.config = config
    
    const root = document.createElement('div')
    const header = document.createElement('div')
    const body = document.createElement('div')

    this.refs = {
      root: root,
      header: header,
      body: body
    }

    this.styleInjector = new StyleInjector(window)
  }

  init () {
    this.styleInjector.enable()

    this.refs.root.classList.add(window.window)
    this.refs.header.classList.add(window.header)
    this.refs.body.classList.add("windowBody")

    this.refs.root.appendChild(this.refs.header)
    this.refs.root.appendChild(this.refs.body)

    // 图标
    const icon = document.createElement('span')
    icon.classList.add(window.icon)

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

    this.refs.header.appendChild(icon)

    // 标题
    const title = document.createElement('span')

    title.classList.add(window.title)
    title.innerText = this.config.title

    this.refs.header.appendChild(title)

    // 关闭按钮
    const closeBtn = document.createElement('span')
    closeBtn.classList.add(window.close)

    closeBtn.addEventListener('click', () => {
      this.handleClose()
    })

    this.refs.header.appendChild(closeBtn)

    // 挂载元素
    document.body.appendChild(this.refs.root)

    // 窗口移动
    const offset = {
      x: 0,
      y: 0
    }

    const moveFunc = (event: MouseEvent) => {
      const x = event.clientX - offset.x
      const y = event.clientY - offset.y

      if (this.isOutOfBrowser(x, y)) {
        return
      }

      this.refs.root.style.left = `${x}px`
      this.refs.root.style.top = `${y}px`
    }

    this.refs.header.addEventListener('mousedown', (event) => {
      // offset.x = event.offsetX
      // offset.y = event.offsetY

      // 获取鼠标相对于root的偏移量
      offset.x = event.clientX - this.refs.root.offsetLeft
      offset.y = event.clientY - this.refs.root.offsetTop

      document.addEventListener('mousemove', moveFunc)
    })

    this.refs.header.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveFunc)
    })

    this.updateWindowSize()

    // 点击窗口任意位置，让窗口显示在最上层
    this.refs.root.addEventListener('mousedown', () => {
      this.refs.root.style.zIndex = "999999"
    })

    // 拦截右键
    this.refs.root.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      event.stopPropagation()
    })

    // 鼠标点击其他位置，恢复窗口的z-index
    document.addEventListener('mousedown', (event) => {
      if (!this.refs.root.contains(event.target as HTMLElement)) {
        this.refs.root.style.zIndex = "99999"
      }
    })
  }

  private isOutOfBrowser (x: number, y: number) {
    const left = x;
    const top = y;
    const right = x + this.config.size.width;
    const bottom = y + this.config.size.height;

    if (left < 0 || top < 0 || right > window.innerWidth || bottom > window.innerHeight) {
      return true
    }

    return false
  }

  private updateWindowSize () {
    const width = this.config.size.width
    const height = this.config.size.height

    this.refs.root.style.width = `${width}px`
    this.refs.root.style.height = `${height}px`
  }

  public show () {
    this.refs.root.style.display = 'block'
  }

  public hide () {
    this.refs.root.style.display = 'none'
  }

  public destroy () {
    this.refs.root.remove()
    this.styleInjector.disable()
  }

  private handleClose () {
    this.hide()
  }
}