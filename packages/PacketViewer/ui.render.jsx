import { getHookedSocket } from '../../src/iirose/ws'
import style from './style.css'
import { render, h } from 'preact'
import { useState } from 'preact/hooks'

const PacketItem = ({ type, time, item }) => {
  return (<div class={style.item}>
    <div class={style.header}>
      <div class={style.type}>{type}</div>
      <div class={style.time}>{time}</div>
    </div>
    <div class={style.content}>
      {item ? item : '[Empty Data]'}
    </div>
  </div>)
}

let setPacket = () => []

getHookedSocket(data => {
  const item = {
    type: "RX",
    time: new Date().toLocaleTimeString(),
    item: data
  }

  setPacket(current => [...current, item])

  return true
}, data => {
  const item = {
    type: "TX",
    time: new Date().toLocaleTimeString(),
    item: data
  }

  setPacket(current => [...current, item])

  return true
})

const PacketViewer = () => {
  const [packet, _setPacket] = useState([])
  setPacket = _setPacket

  return (<div class={style.root}>
    {packet.reverse().map(item => <PacketItem {...item} />)}
  </div>)
}

export default (ref) => {
  render(<PacketViewer />, ref)
}