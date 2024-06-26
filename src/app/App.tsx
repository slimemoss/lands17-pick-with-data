import React from "react"
import PickOption from "./PickOption"

const myObserver = (
    recoreds: MutationRecord[], obs: MutationObserver,
    callback: (recoreds: MutationRecord[], obs: MutationObserver) => void
) => {
    const isChange = recoreds.reduce((prev, cur) => {
        const addedNodes = cur.addedNodes[0] as Element

        return cur.target.parentElement?.classList.contains('divider')
            || addedNodes?.classList?.contains('draft_section')
            || prev
    }, false)

    if(isChange) {
        callback(recoreds, obs)
    }
}

const App = () => {
    const [target, setTarget] = React.useState<Element>(document.createElement('div'))
    const [dammy, setDammy] = React.useState(target.outerHTML)

    React.useEffect(() => {
        const t = document.querySelector('div.draft_pick_options')
        t?.setAttribute('hidden', '')
        if (t) {
            setTarget(t)
            setDammy(t.outerHTML)
        }

        const obs = new MutationObserver((r, o) => myObserver(r, o, () => {
            if (t) {
                setTarget(t)
                setDammy(t.outerHTML)
            }
        }))
        obs.observe(document, { subtree: true, childList: true, characterDataOldValue: true })
    }, [])

    return (
        <div>
            <PickOption original={target} dammy={dammy} />
        </div>
    )
}

export default App
