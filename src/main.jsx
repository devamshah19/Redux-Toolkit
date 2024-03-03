import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Theme.js";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/StoreMain.jsx";
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </ChakraProvider>
);
