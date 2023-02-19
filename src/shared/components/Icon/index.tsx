import React, { FC } from "react";

import {
    Icon as LocalIcon,
    IconProps,
    useTheme,
} from "@rneui/themed";

type Props = IconProps & {};

const Icon: FC<Props> = function ({ color, ...rest }) {
    const { theme } = useTheme();

    return (
        <LocalIcon
            color={color ? color : theme.colors.primary}
            {...rest}
        />
    );
};

export { Icon };
