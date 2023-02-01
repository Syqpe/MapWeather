import { FC, Fragment } from "react";
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
                    <SettingsSectionItem
                        item={item}
                        bottomDivider={
                            filteredItems.length - 1 !== i
                        }
                    />
                </Fragment>
            ))}
        </View>
    ) : null;
};

const useStyles = makeStyles(theme => ({
    section: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 20,
    },
}));

export { SettingsSection };
