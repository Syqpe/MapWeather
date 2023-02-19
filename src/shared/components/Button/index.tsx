import React, { FC } from "react";

import {
    Button as LocalButton,
    ButtonProps,
} from "@rneui/themed";

type Props = ButtonProps & {};

const Button: FC<Props> = function ({ ...rest }) {
    return <LocalButton {...rest} />;
};

export { Button };
