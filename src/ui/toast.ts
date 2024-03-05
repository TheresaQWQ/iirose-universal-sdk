// @ts-ignore
const sendToast = window._alert

export const toast = (message: string) => {
  sendToast(message)
}

export const musicToast = (html: string) => {
  sendToast(html, true)
}