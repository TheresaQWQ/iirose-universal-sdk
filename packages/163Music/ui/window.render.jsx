import { render, h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { search, play } from '../lib/music.ts'
import style from './style.css'

const MusicItem = (props) => {
  return (
    <div class={style.item}>
      <div class={style.item__img} style={{ backgroundImage: `url(${props.cover})` }} />
      <div class={style.item__info}>
        <div>
          <p class={style.item__title}>{props.name}</p>
          <p class={style.item__artists}>{props.artists}</p>
        </div>
        <div>
          <button class={style.item__play} onClick={() => play(props.id)}>播放</button>
        </div>
      </div>
    </div>
  )
}

const App = (props) => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (props.keyword === '') return
    setSongs([])
    search(props.keyword).then(data => setSongs(data))
  }, [props.keyword])

  return (
    <div class={style.root}>
      {songs.map((item) => <MusicItem {...item} />)}
    </div>
  )
}

export default (ref, window) => {
  return {
    setKeyword: (keyword) => {
      render(<App keyword={keyword} />, ref)
      window.show()
    }
  }
}

// @ts-ignore
if (module.hot) module.hot.accept()