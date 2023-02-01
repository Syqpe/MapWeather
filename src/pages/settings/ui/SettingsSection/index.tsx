import { FC, Fragment } from "react";
import { View } from "react-native";

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
    const filteredItems = items.filter(item =>
        item?.title
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()),
    );

    return (
        <View>
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
    );
};

export { SettingsSection };
