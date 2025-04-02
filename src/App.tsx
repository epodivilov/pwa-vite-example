import { Global } from "@emotion/react";
import { globalStyles } from "./styles/globalStyles";
// import ChatLayout from "./components/Chat/ChatLayout";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      {/* <ChatLayout /> */}
      <MainLayout />
    </>
  );
}

export default App;
