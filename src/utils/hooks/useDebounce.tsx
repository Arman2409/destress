import { useEffect, useRef, useState } from "react"

const useDebounce = (
    variable: unknown,
    waitIme: number,
    conditionCallback?: (variable: unknown) => boolean
): unknown => {
    const [newState, setNewState] = useState<unknown>(null);
    const timeoutRef = useRef<string | number | NodeJS.Timeout>(1000);

    useEffect(() => {
        if (conditionCallback) {
            const result = conditionCallback(variable);
            if (result) {
                timeoutRef.current = setTimeout(() => {
                    setNewState(variable);
                }, waitIme)
            }
        } else {
            timeoutRef.current = setTimeout(() => {
                setNewState(variable);
            }, waitIme)
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variable])

    return newState;
}

export default useDebounce;