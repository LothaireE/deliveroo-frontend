import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-lothaire.herokuapp.com/"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
}

export default App;
