import { ImageSourcePropType } from "react-native/types"

export interface DataProps {
    id:number,
    title:string,
    image:ImageSourcePropType,
    video:string
}

export const Data : DataProps[] = [
    {
        id:0,
        title:'Hello',
        image:require('../../../assets/images/Hero.jpeg'),
        video:'https://res.cloudinary.com/anikets/video/upload/v1689084298/video4_yne8wm.mp4'
    },
    {
        id:1,
        title:'Hello',
        image:require('../../../assets/images/Hero2.png'),
        video:'https://res.cloudinary.com/anikets/video/upload/v1689084305/video2_vtlxe6.mp4'
    },
    {
        id:2,
        title:'Hello',
        image:require('../../../assets/images/Hero3.png'),
        video:'https://res.cloudinary.com/anikets/video/upload/v1689084298/video3_o0v9ke.mp4'
    },
    {
        id:3,
        title:'Hello',
        image:require('../../../assets/images/Hero4.png'),
        video:'https://res.cloudinary.com/anikets/video/upload/v1689084294/video1_mhwbbf.mp4'
    },
]