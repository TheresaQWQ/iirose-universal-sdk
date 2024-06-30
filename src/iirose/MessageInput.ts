const input = document.querySelector("#moveinputDisplay textarea") as HTMLTextAreaElement

type HookFunction = (message: string) => boolean
type HookFunctions = HookFunction[]

const hooks: HookFunctions = []

const inputHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        const message = input.value.trim()
        if (message.trim() === "") {
            return true
        }

        for (const hook of hooks) {
            try {
                if (hook(message)) {
                    input.value = ""
                    return false
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    return true
}

input.addEventListener("keydown", inputHandler, true)

export const addInputHook = (hook: HookFunction) => {
    console.log("adding input hook")
    hooks.push(hook)
}

// @ts-ignore
if (module.hot) module.hot.accept();