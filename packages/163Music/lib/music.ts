import sdk from "../../loader.sdk"

export const search = async (keyword: string) => {
  const resp = await fetch(`https://xc.null.red:8043/api/netease/cloudsearch?keywords=${encodeURIComponent(keyword)}`)
  const json = await resp.json()

  const songs = json.result.songs

  return songs.map((item: any) => ({
    id: item.id,
    name: item.name,
    artists: item.ar.map((item: any) => item.name).join(', '),
    cover: item.al.picUrl,
    duration: item.dt
  }))
}

export const play = async (id: string) => {
  sdk.ui.toast.toast(`加载中...`)

  try {
    const resp = await fetch(`https://xc.null.red:8043/meting-api/?type=302&id=${id}`)
    const metadata = await resp.json()
  
    sdk.iirose.socket._send(`&1${JSON.stringify({
      b: `=0`,
      c: metadata.pic.substring(4),
      d: metadata.time/1e3,
      n: metadata.name,
      o: '',
      r: metadata.author,
      s: metadata.url.substring(4) + `&fd=${id}.mp3`,
      l: metadata.lrc_control
    })}`)
  
    sdk.ui.toast.toast(`成功点播 ${metadata.name}(${metadata.auther})`)
  } catch (error) {
    sdk.ui.toast.toast(`点播失败: ${error}`)
  }
}

// @ts-ignore
if (module.hot) module.hot.accept()