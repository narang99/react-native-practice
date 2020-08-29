import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const save = () => {
      setScreenWidth(Dimensions.get("window").width);
      setScreenHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", save);
    return () => {
      Dimensions.removeEventListener("change", save);
    };
  });
  return { screenWidth, screenHeight };
};

export default useScreenSize;
