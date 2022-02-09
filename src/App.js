import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Restaurant from "./components/Restaurant";
import logo from "./assets/image/logo.png";
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  // const handeAddToCart = (item) => {

  // };

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
                              const newCart = [...cart];
                              let isInCart = false;
                              for (let i = 0; i < cart.length; i++) {
                                if (cart[i].id === meal.id) {
                                  console.log("test1");
                                  isInCart = true;
                                  newCart[i].quantity += 1;
                                  newCart[i].price =
                                    Number(newCart[i].price) +
                                    Number(meal.price);

                                  break;
                                }
                              }
                              if (!isInCart) {
                                newCart.push({
                                  title: meal.title,
                                  price: meal.price,
                                  quantity: 1,
                                  id: meal.id,
                                });
                              }
                              setCart(newCart);
                              //

                              // newCart.push({
                              //   title: meal.title,
                              //   price: meal.price,
                              //   quantity: 1,

                              //   id: meal.id,
                              // });
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
            <button>Valider mon panier</button>
            {cart.length === 0 ? (
              <div>
                <h3>Votre panier est vide</h3>
              </div>
            ) : (
              cart.map((meal, index3) => {
                return (
                  <div key={index3}>
                    <div></div>

                    <div>
                      <p>{meal.title}</p>
                      <p>{meal.price}</p>
                      <p>{meal.quantity}</p>
                      {/* <p>{shoppingCart.quantity}</p> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
