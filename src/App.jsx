
import "./index.css";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Root component that sets up Redux Provider and main layout structure
function App() {
  return (
    <Provider store={appStore}>
      <Header />
      {/* Renders the child route's element */}
      <Outlet />
      <Footer />
    </Provider>
  );
}

export default App;
