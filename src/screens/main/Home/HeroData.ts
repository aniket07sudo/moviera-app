import { ImageSourcePropType } from "react-native/types"

export interface DataProps {
    id:number,
    title:string,
    image:ImageSourcePropType
}

export const Data : DataProps[] = [
    {
        id:1,
        title:'Hello',
        image:require('../../../assets/images/Hero.jpeg')
    },
    {
        id:2,
        title:'Hello',
        image:require('../../../assets/images/Hero2.png')
    },
    {
        id:3,
        title:'Hello',
        image:require('../../../assets/images/Hero3.png')
    },
    {
        id:4,
        title:'Hello',
        image:require('../../../assets/images/Hero4.png')
    },
]