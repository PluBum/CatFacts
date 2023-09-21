// import { cats } from "./data/cats";
import { MapCats } from "./components/CatMap";
import { getImageData } from "./components/CatsRequest";

function App() {
  getImageData();
  return <MapCats />;
}

export default App;
