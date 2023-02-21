import React, { useState, FC, ReactNode } from "react";
import {
    GestureResponderEvent,
    TouchableOpacity,
} from "react-native";
import { ListItem } from "@rneui/themed";

import { Icon } from "@components/index";

type IItemElement = ReactNode;

interface IItem {
    title?: string;
    iconName?: string;
    onPress?: (event: GestureResponderEvent) => void;
    render?: IItemElement;
    children?: IItemElement;
}

interface Props {
    item: IItem;
    bottomDivider?: boolean;
}

const SettingsSectionItem: FC<Props> = function ({
    item: {
        title = "",
        iconName = "",
        onPress,
        render,
        children,
    },
    bottomDivider,
}) {
    const [expanded, setExpanded] = useState(false);

    const isChildrenExist = !!children;

    const getItemContent = (() => (
        <>
            <Icon
                type="ionicon"
                name={iconName}
                style={{ marginRight: 6 }}
            />
            <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
            </ListItem.Content>
        </>
    ))();

    if (render) {
        return <>{render}</>;
    }

    return (
        <TouchableOpacity
            onPress={
                isChildrenExist
                    ? () => {
                          setExpanded(!expanded);
                      }
                    : onPress
            }
        >
            {isChildrenExist ? (
                <ListItem.Accordion
                    isExpanded={expanded}
                    content={getItemContent}
                >
                    {children}
                </ListItem.Accordion>
            ) : (
                <ListItem bottomDivider={bottomDivider}>
                    {getItemContent}
                </ListItem>
            )}
        </TouchableOpacity>
    );
};

export type { IItem };
export { SettingsSectionItem };
