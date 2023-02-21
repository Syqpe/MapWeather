import React, { FC, Fragment } from "react";
import { View } from "react-native";
import { makeStyles } from "@rneui/themed";

import {
    SettingsSectionItem,
    IItem,
} from "../SettingsSectionItem";

interface Props {
    searchText: string;
    items: Array<IItem>;
}

const SettingsSection: FC<Props> = function ({
    searchText,
    items,
}) {
    const styles = useStyles();

    const filteredItems = items.filter(item =>
        item?.title
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()),
    );

    return filteredItems.length ? (
        <View style={styles.section}>
            {filteredItems.map((item, i) => (
                <Fragment key={i}>
                    <SettingsSectionItem item={item} />
                </Fragment>
            ))}
        </View>
    ) : null;
};

const useStyles = makeStyles(theme => ({
    section: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
}));

export { SettingsSection };
