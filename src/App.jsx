import SectionDisplay from "./components/SectionDisplay";
import SectionInputs from "./components/SectionInputs";
import AiAssistant from "./components/AiAssistant";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main className="flex justify-center items-start flex-1 bg-gray-50 overflow-y-auto py-10">
        <div className="max-sm:flex-col flex justify-center gap-10 w-full max-w-7xl px-6">
          <SectionInputs />
          <SectionDisplay />
          <div className="max-w-md w-full">
            <AiAssistant />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
