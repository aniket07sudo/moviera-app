import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useScreenDimensions = () => {
    const [screenData, setScreenData] = useState(Dimensions.get('screen'));
  
    useEffect(() => {
      const onChange = (result:any) => {
        setScreenData(result.screen);
      };
  
      let dimensionHandler = Dimensions.addEventListener('change', onChange);
  
      return () => {
        dimensionHandler.remove();
      };
    });
  
    return {
      ...screenData,
      isLandscape: screenData.width > screenData.height,
    };
  };

export default useScreenDimensions;