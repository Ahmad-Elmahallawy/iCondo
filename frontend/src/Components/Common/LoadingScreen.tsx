import React from "react";
import { BounceLoader } from "react-spinners";
import "../../Style/CommonStyle/LoadingScreenStyle.css";
const LoadingScreen = () => {
  return (
    <div className="loading-background">
      <BounceLoader size={60} color={"#3c3633"} loading={true} data-testid="loading-spinner"/>
    </div>
  );
};

export default LoadingScreen;
