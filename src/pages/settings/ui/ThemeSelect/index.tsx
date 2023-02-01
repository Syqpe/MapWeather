import { useState, FC } from "react";
import { View, ButtonGroup } from "react-native";
import { ListItem, Text } from "@rneui/themed";

const ThemeSelect: FC = function ({}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <ButtonGroup
            buttons={["dark", "light", "default"]}
            selectedIndex={selectedIndex}
            onPress={value => {
                setSelectedIndex(value);
            }}
        />
        // <ListItem>
        //     <ListItem.Content>
        //         <ListItem.Title>{"1"}</ListItem.Title>
        //     </ListItem.Content>
        //     <ListItem.Chevron />
        // </ListItem>
        // <>
        //     <View>
        //         <Text>123</Text>
        //     </View>
        //     {[
        //         {
        //             title: "dark",
        //         },
        //         {
        //             title: "light",
        //         },
        //     ].map((l, i) => (
        //         <ListItem key={i}>
        //             <ListItem.Content>
        //                 <ListItem.Title>
        //                     {l.title}
        //                 </ListItem.Title>
        //             </ListItem.Content>
        //             <ListItem.Chevron />
        //         </ListItem>
        //     ))}
        // </>
    );
};

export { ThemeSelect };
