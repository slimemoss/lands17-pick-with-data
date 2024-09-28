export function PackCards() {
    const div = document.querySelector<Element>('div.draft_pick_options')

    return [...div?.querySelectorAll('div.card_slot_2')||[]].map(div => {
        return {
            name: div.querySelector('img.card_slot_2')?.getAttribute('alt'),
            div: div.cloneNode(true)
        }
    })
}
