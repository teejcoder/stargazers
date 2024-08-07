import GetImage from "./components/GetImage";

const NASA_API = process.env.REACT_APP_NASA_API;

function App() {

  return (
    <div className="text-center mx-10 sm:mx-20 lg:mx-60 ">
      <GetImage />
    </div>
  );
}

export default App;
