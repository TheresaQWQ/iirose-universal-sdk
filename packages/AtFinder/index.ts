import sdk from "../loader.sdk";
import { addInputHook } from "../../src/iirose/MessageInput";
import { appendStyle } from "../../src/ui/css";

const username = sdk.iirose.username()
const selector = `.room_chat_content .followName2`

const blink = (element: Element) => {
    element.classList.add("atfinder-blink")
    setTimeout(() => {
        element.classList.remove("atfinder-blink")
    }, 3e3)
}

addInputHook((input: string) => {
  if (input.startsWith("at@")) {
      if (isNaN(Number(input.split("at@")[1]))) return false

      const index = parseInt(input.split("at@")[1]) || 1

      // Array.from(document.querySelectorAll("#msgholder > div.fullBox > div > div > div > div.roomChatContentBox > div.room_chat_content > div.chatContentHolder.publicMsgHasBubble.bgLight > span")).filter(v => v.innerText.trim() === JSON.parse(localStorage.getItem("cookie")).username)[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      const elements = Array.from(document.querySelectorAll(selector)).reverse().filter((v: any) => v.innerText.trim() === username)
      const target = elements[index - 1]

      console.log(elements, index, target)

      if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
          // @ts-ignore
          const blink_target = target.parentElement.parentElement.parentElement.parentElement.parentElement as Element
          setTimeout(() => blink(blink_target), 500)
          sdk.ui.toast.toast(`找到力！ (总共 ${elements.length} 条消息at了您)`)
      } else {
          sdk.ui.toast.toast("没有找哦")
      }

      return true
  }

  return false
})

// css背景和边框闪烁三次，一次性动画效果，不要infinite循环
appendStyle(`
    @keyframes atfinder-blink {
        0% {
            filter: brightness(1);
        }
        
        50% {
            filter: brightness(2);
        }
        
        100% {
            filter: brightness(1);
        }
    }
    
    .atfinder-blink {
        animation: atfinder-blink 0.5s;
        animation-iteration-count: 6;
    }
`)