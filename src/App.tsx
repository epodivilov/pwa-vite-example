import { Global } from "@emotion/react";
import { globalStyles } from "./styles/globalStyles";
// import ChatLayout from "./components/Chat/ChatLayout";
import { TestLayout } from "./layouts/TestLayout";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <ChatLayout /> */}
      <TestLayout />
    </>
  );
}

export default App;
