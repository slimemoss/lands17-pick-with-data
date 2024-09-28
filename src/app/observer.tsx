export class TransitionPickObserver {
    observer: MutationObserver

    constructor(callback: ()=>void) {
        this.observer = new MutationObserver((records) => {
            const isChange = records.reduce((prev, cur) => {
                const addedNodes = cur.addedNodes[0] as Element

                return cur.target.parentElement?.classList.contains('divider')
                    || addedNodes?.classList?.contains('draft_section')
                    || prev
            }, false)

            if(isChange) {
                callback()
            }
        })
    }

    observe() {
        this.observer.observe(document,
                              {subtree: true, childList: true, characterDataOldValue: true})
    }

    disconnect() {
        this.observer.disconnect();
    }    
}
