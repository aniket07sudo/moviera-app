import metrics from "./metrics";

const size = {
    font6:metrics.screenWidth * (6 / 365),
    font16:metrics.screenWidth * (16 / 365)
}

const weight = {
    bold:'700',
    semi:'600',
    medium:'500',
    regular:'400',
    thin:'300'
}

const type = {
    poppinsLight:'Poppins-Light',
    poppinsRegular:'Poppins-Regular',
    poppinsMedium:'Poppins-Medium',
    poppinsSemi:'Poppins-SemiBold',
    poppinsBold:'Poppins-Bold'
}

export default {
    size,
    weight,
    type
}