import GetImage from "./components/GetImage";
import Navbar from "./components/Navbar";
import Particles from "./components/ui/Particles";

function App() {

  return (
    <div className="text-center mx-auto">
      <Navbar />
      <Particles
        quantity={500}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <Particles
        quantity={500}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <GetImage />
    </div>
  );
}

export default App;
