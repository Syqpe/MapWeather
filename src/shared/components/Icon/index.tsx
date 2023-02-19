import React, { FC } from "react";

import {
    Icon as LocalIcon,
    IconProps,
} from "@rneui/themed";

type Props = IconProps & {};

const Icon: FC<Props> = function ({ ...rest }) {
    return <LocalIcon {...rest} />;
};

export { Icon };
