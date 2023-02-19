import React, { FC, ReactNode } from "react";
import {
    View,
    TextInput,
    TextInputProps,
} from "react-native";
import { makeStyles } from "@rneui/themed";

type Props = TextInputProps & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const Input: FC<Props> = function ({
    leftIcon,
    rightIcon,
    style,
    ...rest
}) {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            {leftIcon}
            <TextInput
                style={[styles.input, style]}
                {...rest}
            />
            {rightIcon}
        </View>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    input: {
        flex: 1,
        fontSize: 20,
        paddingHorizontal: 6,
    },
}));

export { Input };
