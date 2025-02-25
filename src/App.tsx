import React from 'react';

import AllRoutes from "./routes/Routes";

import "./assets/scss/app.scss";
import "./assets/scss/icons.scss";
import { CommutingProvider } from "@/context/CommutingContext.tsx";


const App = () => {

  return (
    <>
      <React.Fragment>
        <CommutingProvider>
          <AllRoutes />
        </CommutingProvider>
      </React.Fragment>
    </>
  );
}

export default App;
