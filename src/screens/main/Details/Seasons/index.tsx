import { useImperativeHandle } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SemiBold } from "../../../../utils/Text";
import fonts from "../../../../theme/fonts";
import RectCard from "../../../../components/RectCard";
import { EpisodesData } from "../../../../lib/constants";
import { Spacing } from "../../../../theme/spacing";
import { Colors } from "../../../../theme/colors";


export default function Episode() {

    return (
        <View style={Styles.container}>
            <SemiBold styles={{fontSize:fonts.size.font14,paddingLeft:Spacing.screenPadding,paddingBottom:10}}>Season 1</SemiBold>
            <FlatList 
                horizontal
                data={EpisodesData}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:Spacing.screenPadding}}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <RectCard {...item} />
                )}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        paddingTop:Spacing.buttonTopPadding,
        backgroundColor:Colors.secondary,
        flex:1
    }
})