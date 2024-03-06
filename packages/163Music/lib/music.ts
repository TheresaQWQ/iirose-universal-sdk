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

const createSign = async (id: string) => {
  const token = '2126696677'
  const time = Date.now()
  const text = `${id}.metadata.${time}|${token}`

  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    sign: hex,
    time: time
  };
}

export const play = async (id: string) => {
  sdk.ui.toast.toast(`加载中...`)

  try {
    const {sign, time} = await createSign(id)

    const resp = await fetch(`https://ifs.imoe.xyz/api/v1/163?id=${id}&type=metadata&time=${time}&sign=${sign}`)
    const metadata = await resp.json()
  
    sdk.iirose.socket._send(`&1${JSON.stringify({
      b: `=0`,
      c: metadata.pic.substring(4),
      d: metadata.time/1e3,
      n: metadata.name,
      o: '',
      r: metadata.auther,
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