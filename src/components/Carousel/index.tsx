import { Image, StyleSheet, View } from "react-native"
import metrics from "../../theme/metrics";
import FastImage from "react-native-fast-image";

const CarouselComponent = () => {

    return (
        <View style={Styles.container}>
            <View style={Styles.imageContainer}>
                <FastImage style={{width:'100%',height:'100%'}} resizeMode={FastImage.resizeMode.cover} source={require('../../assets/images/Hero.jpeg')} />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{

    },
    imageContainer:{
        height:metrics.screenHeight * 0.6,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        overflow:'hidden'
    }
});

export default CarouselComponent;