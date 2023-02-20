import React, {
    ForwardedRef,
    MutableRefObject,
} from "react";

type TRefs<T> = Array<
    | ((instance: T | null) => void)
    | MutableRefObject<T | null>
    | null
    | ForwardedRef<T | null>
>;

const useCombinedRefs = function <T>(...refs: TRefs<T>) {
    const targetRef = React.useRef<T>(null);

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) {
                return;
            }

            if (typeof ref === "function") {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

export { useCombinedRefs };
