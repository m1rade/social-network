import React from 'react';
import preloader from "./../../assets/Preloader-125px.svg";

const Preloader: React.FC<any> = () => {
  return <img src={preloader} alt="loading..." />;
}

export default Preloader;