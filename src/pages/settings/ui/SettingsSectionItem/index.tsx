import React, { useState, FC, ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
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

    return isChildrenExist ? (
        <ListItem.Accordion
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
            content={getItemContent}
        >
            {children}
        </ListItem.Accordion>
    ) : (
        <ListItem
            onPress={onPress}
            bottomDivider={bottomDivider}
        >
            {getItemContent}
        </ListItem>
    );
};

export type { IItem };
export { SettingsSectionItem };
