import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-800 font-poppins selection:bg-[#f4c34a] selection:text-zinc-900">
      <Navbar />
      <main className="grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;