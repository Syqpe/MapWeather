import React, {
    useEffect,
    FC,
    PropsWithChildren,
} from "react";

import { useThemeMode } from "../../shared/hooks/useThemeMode";

interface Props extends PropsWithChildren {}

const ThemeSettings: FC<Props> = ({ children }) => {
    const { getModeFromStorage } = useThemeMode();

    useEffect(() => {
        async function fetchData() {
            await getModeFromStorage();
        }

        fetchData();
    }, [getModeFromStorage]);

    return <>{children}</>;
};

export { ThemeSettings };
