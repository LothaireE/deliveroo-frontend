import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Restaurant from "./components/Restaurant";
import logo from "./assets/image/logo.png";
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const handeAddToCart = (item) => {
    const newCart = [...cart];
    newCart.push({ title: item.title, price: item.price });
    setCart(newCart);
    console.log("======>", item);
    return console.log(newCart);
  };

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
                        return (
                          // ici!!!!!!!!!!!!!!!!!!!!!!!!!!!

                          <div
                            className="plates"
                            onClick={() => {
                              handeAddToCart(meal);
                            }}
                            key={deudex}
                          >
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
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="container-2">
          <div className="cart">
            {cart.map((shoppingCart, index3) => {
              console.log(shoppingCart);
              return cart.length < 1 ? (
                <div>
                  <p>what I really want !</p>
                </div>
              ) : (
                <div key={index3}>
                  <div>
                    <p>{shoppingCart.title}</p>
                    <p>{shoppingCart.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
