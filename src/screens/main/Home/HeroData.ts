import { ImageSourcePropType } from "react-native/types"

export interface DataProps {
    id:number,
    title:string,
    image:ImageSourcePropType,
    video:string
}

export const Data : DataProps[] = [
    {
        id:1,
        title:'Hello',
        image:require('../../../assets/images/Hero.jpeg'),
        video:'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4'
    },
    {
        id:2,
        title:'Hello',
        image:require('../../../assets/images/Hero2.png'),
        video:'https://assets.mixkit.co/videos/preview/mixkit-pov-of-a-basket-of-easter-eggs-48595-large.mp4'
    },
    {
        id:3,
        title:'Hello',
        image:require('../../../assets/images/Hero3.png'),
        video:'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4'
    },
    {
        id:4,
        title:'Hello',
        image:require('../../../assets/images/Hero4.png'),
        video:'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4'
    },
]