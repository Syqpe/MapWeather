import React, { FC } from "react";

import {
    makeStyles,
    Text as LocalText,
    TextProps,
} from "@rneui/themed";

type Props = TextProps & {
    bold?: boolean;
};

const Text: FC<Props> = function ({
    style,
    bold,
    ...rest
}) {
    const styles = useStyles();

    const getFontWeight = () => {
        return bold ? "bold" : "normal";
    };

    return (
        <LocalText
            style={[
                styles.text,
                {
                    fontWeight: getFontWeight(),
                },
                style,
            ]}
            {...rest}
        />
    );
};

const useStyles = makeStyles(theme => ({
    text: {
        color: theme.colors.primary,
    },
}));

export { Text };
