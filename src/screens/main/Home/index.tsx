import React from "react";
import { Button,Text, View } from "react-native";
import Font from '../../../theme/fonts';
import { useTranslation } from "react-i18next";
import { RegularText } from "../../../utils/Text";
import fonts from "../../../theme/fonts";

const HomeScreen = ({navigation}) => {

    const {t} = useTranslation();

    return (
     <View style={{flex:1}}>
        <RegularText styles={{fontSize:fonts.size.font16}} >Hiii</RegularText>
        {/* <Text style={{fontSize:30,fontFamily:Font.type.poppinsRegular}}>{t('Common:welcome')}</Text> */}
        <Button title="Details" onPress={() => navigation.push('HomeStack', { screen:'HomeDetailsScreen' })} />
     </View>
    )
}

export default HomeScreen;