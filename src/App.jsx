import SectionDisplay from "./components/SectionDisplay";
import SectionInputs from "./components/SectionInputs";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
        <div className="max-sm:flex-col flex justify-center gap-10 w-full max-w-7xl px-6">
          <SectionInputs />
          <SectionDisplay />
        </div>
      </main>
    </>
  );
}

export default App;
