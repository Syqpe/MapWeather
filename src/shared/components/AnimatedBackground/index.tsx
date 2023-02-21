import React, { useEffect, useRef, FC } from "react";
import {
    Animated,
    Easing,
    ImageBackground,
    ImagePropsBase,
} from "react-native";
import { makeStyles } from "@rneui/themed";

import {
    INPUT_RANGE_START,
    INPUT_RANGE_END,
    OUTPUT_RANGE_START,
    OUTPUT_RANGE_END,
    ANIMATION_TO_VALUE,
    ANIMATION_DURATION,
} from "@utils/index";

type Props = ImagePropsBase & {};

const AnimatedBackground: FC<Props> = function ({
    ...rest
}) {
    const styles = useStyles();

    const initialValue = 0;
    const translateValue = useRef(
        new Animated.Value(initialValue),
    ).current;

    useEffect(() => {
        const translate = () => {
            translateValue.setValue(initialValue);
            Animated.timing(translateValue, {
                toValue: ANIMATION_TO_VALUE,
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => translate());
        };

        translate();
    }, [translateValue]);

    const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });

    const AnimetedImage =
        Animated.createAnimatedComponent(ImageBackground);

    return (
        <AnimetedImage
            resizeMode="repeat"
            style={[
                styles.background,
                {
                    transform: [
                        {
                            translateX: translateAnimation,
                        },
                        {
                            translateY: translateAnimation,
                        },
                    ],
                },
            ]}
            {...rest}
        />
    );
};

const useStyles = makeStyles(() => ({
    background: {
        position: "absolute",
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.4,
        transform: [
            {
                translateX: 0,
            },
            {
                translateY: 0,
            },
        ],
    },
}));

export { AnimatedBackground };
