import { Text, View } from "react-native";
import { MediumText } from "../../utils/Text";
import Episode from "../../screens/main/Details/Seasons";
import Similar from "../../screens/main/Details/Similar";
import About from "../../screens/main/Details/About";

interface TabItemProps {
    pageType:string
}

export default function TabItem({pageType}:TabItemProps) {

    let Item = null;

    switch(pageType) {
        case 'Episode':
            Item = <Episode />;
            break;
        case 'Similar':
            Item = <Similar />;
            break;
        case 'About':
            Item = <About />;
            break;
        default:
            return (<Text>Default</Text>)
    }

    return (
        <View style={{height:300}}>
            {Item}
        </View>
    )
}