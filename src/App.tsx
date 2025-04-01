import { Global } from "@emotion/react";
import { globalStyles } from "./styles/globalStyles";
// import ChatLayout from "./components/Chat/ChatLayout";
import { TestLayout } from "./layouts/TestLayout";
import PWABadge from "./PWABadge";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <ChatLayout /> */}
      <TestLayout />
      <PWABadge />
    </>
  );
}

export default App;
