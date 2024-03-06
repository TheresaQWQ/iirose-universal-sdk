import { render, h } from 'preact'
import { useState } from 'preact/hooks'
import sdk from '../../../src/index'
import FormStyle from '../../../src/ui/css/input.module.css'
import style from './style.css'

const OwOInput = (props) => {
  const [value, setValue] = useState('');

  const handleInput = event => {
    setValue(event.target.value);
    props.onChange(value);
  }

  return (
    <input class={[FormStyle.text, style.FullWidth].join(' ')} placeholder={props.placeholder} value={value} onInput={handleInput} />
  )
}

const OwOSelect = (props) => {
  const [value, setValue] = useState('');

  const handleInput = event => {
    setValue(event.target.value);
    props.onChange(value);
  }

  const options = () => {
    return props.options.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    })
  }

  return (
    <select class={[FormStyle.select, style.FullWidth].join(' ')} value={value} onInput={handleInput}>
      {options()}
    </select>
  )
}

const OwOButton = (props) => {
  return (
    <button class={[FormStyle.button, style.FullWidth].join(' ')} onClick={props.onClick}>{props.text}</button>
  )
}

const App = ({ }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [url, setUrl] = useState('')
  const [duration, setDuration] = useState('')
  const [mode, setMode] = useState('')

  const sendMedia = () => {
    const typeMap = {
      '音乐': 0,
      '视频': 1
    }

    const data = {
      b: `=${typeMap[mode]}`,
      c: cover.substring(4),
      d: duration,
      n: title,
      o: '',
      r: author,
      s: url.substring(4),
      l: ''
    }

    sdk.iirose.socket._send(`&1${JSON.stringify(data)}`)
    sdk.ui.toast.toast("点播成功")
  }

  return (
    <div>
      <OwOInput onChange={setTitle} placeholder="标题" />
      <OwOInput onChange={setAuthor} placeholder="作者" />
      <OwOInput onChange={setCover} placeholder="封面" />
      <OwOInput onChange={setUrl} placeholder="链接" />
      <OwOInput onChange={setDuration} placeholder="时长" />
      <OwOSelect onChange={setMode} placeholder="模式" options={['音乐', '视频']} />
      <OwOButton text="发送" onClick={sendMedia} />
    </div>
  );
}

export default (ref) => {
  render(<App />, ref);
}