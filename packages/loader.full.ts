import "./MediaSender/index"
import "./PacketViewer/index"
import "./163Music/index"
import "./AtFinder/index"

import sdk from "../src"

sdk.ui.toast.toast([
    "OwOSDK(iirose-universal-sdk) 已成功加载，当前为测试版本，如果遇到问题还请反馈给咱w\n",
    "点歌: 发送 !+关键词",
    "谁在at我: 发送 at@ 或 at@序号"
].join("\n"))