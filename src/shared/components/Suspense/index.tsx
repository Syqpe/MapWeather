import {
    Suspense as ReactSuspense,
    FC,
    ReactNode,
} from "react";

import { Icon } from "@rneui/themed";

interface Props {
    children: ReactNode;
}

export const Suspense: FC<Props> = function ({ children }) {
    return (
        <ReactSuspense
            fallback={<Icon type={""} name={"loading"} />}
        >
            {children}
        </ReactSuspense>
    );
};
