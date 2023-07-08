import { ImageSourcePropType } from "react-native/types"

export interface TrayDataType {
    id:number,
    image:ImageSourcePropType
}

export const TrayData : TrayDataType[] = [
    {
        id:1,
        image:require('../../../assets/images/TrayImages/tray1.jpg')
    },
    {
        id:2,
        image:require('../../../assets/images/TrayImages/tray2.jpg')
    },
    {
        id:3,
        image:require('../../../assets/images/TrayImages/tray3.jpg')
    },
    {
        id:4,
        image:require('../../../assets/images/TrayImages/tray4.jpg')
    },
    {
        id:5,
        image:require('../../../assets/images/TrayImages/tray5.jpg')
    },
    {
        id:6,
        image:require('../../../assets/images/TrayImages/tray6.jpg')
    }
]