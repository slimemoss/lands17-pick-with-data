import { useState } from "react";

export function useForceRerender() {
    const [_, setCount] = useState(0)

    function forceRender() {
        setCount(c => c+1)
    }

    return forceRender
}
