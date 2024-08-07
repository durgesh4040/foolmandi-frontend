import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const LoaderComponent = () => {
  return (
    <>
      <Dimmer active>
        <Loader></Loader>
      </Dimmer>
    </>
  );
};
export default LoaderComponent;
