import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Restaurant from "./components/Restaurant";
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-lothaire.herokuapp.com/"
      );
      // console.log("===>", response.data);

      setData(response.data);
      // console.log(data);

      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div>loading</div>
  ) : (
    <div>
      <Restaurant name={name} />

      {/* <div className="restaurant">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>

        <img
          className="restaurant-picture"
          src={data.restaurant.picture}
          alt="restaurant"
        />
      </div> */}

      <div>
        {data.categories.map((category, index) => {
          console.log(category);
          // console.log("çaaaaaaaa", category.meals);
          return (
            <div className="categories" key={index}>
              <p>{category.name} </p>
              <div>
                {category.meals.map((meal, deudex) => {
                  console.log("=======>", meal.name);
                  return (
                    <div className="plates" key={deudex}>
                      <p>{meal.title}</p>
                      <p>{meal.description} </p>
                      <p>{meal.price}</p>
                      <div>
                        <img src={meal.picture} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <p key={index}>{category.meals} </p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
