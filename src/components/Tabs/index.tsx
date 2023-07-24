import { View ,Text} from "react-native";
import { MediumText } from "../../utils/Text";
import Animated from "react-native-reanimated";
import TabHeader from "./header";

export interface TabsDataProps {
    id:number,
    title:string
}

const tabsData : TabsDataProps[] = [
    {
        id:1,
        title:'Season 1'
    },
    {
        id:2,
        title:'Season 2'
    },
    {
        id:3,
        title:'Season 3'
    },
    {
        id:4,
        title:'Season 4'
    }
]

export const TabsDefault = tabsData.map(({id,title}) => ({id,title,anchor:0}));

console.log("Tabs Default",TabsDefault);
export const TAB_HEIGHT = 30;


export default function TabsComponent() {

    return (
        <View>
            <TabHeader tabsData={tabsData} />
        </View>
    )
}