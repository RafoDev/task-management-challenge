import { AppProvider } from "./app/provider";
import { AppRouter } from "./app/router";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
