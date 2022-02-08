import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Restaurant from "./components/Restaurant";
import logo from "./assets/image/logo.png";
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
    <div className="app">
      <header>
        <div className="top-bar">
          <div className="top-bar-center">
            <img className="logo" src={logo} alt="" />
          </div>
        </div>
        <div>
          <Restaurant restaurantInfo={data.restaurant} />
        </div>
      </header>
      <div className="containers">
        <div className="container-1">
          <div className="what">
            {data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <div className="categories" key={index}>
                    <h2>{category.name}</h2>
                    <div className="category">
                      {category.meals.map((meal, deudex) => {
                        console.log("=======>", meal.name);
                        return (
                          <div className="plates" key={deudex}>
                            <div className="plates-text">
                              <div className="plates-sub-text">
                                <h3>{meal.title}</h3>
                                <p>{meal.description} </p>
                              </div>

                              <div className="plates-info">
                                <span>{meal.price} €</span>
                                {meal.popular && <span>etoile</span>}
                              </div>
                            </div>

                            {meal.picture && (
                              <div className="plates-img">
                                <img src={meal.picture} alt="" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* <p key={index}>{category.meals} </p> */}
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="container-2">Mon panier</div>
      </div>
    </div>
  );
}
export default App;
