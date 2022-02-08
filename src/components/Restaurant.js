const Restaurant = (props) => {
  return (
    <div className="restaurant-info">
      <div className="restaurant-info-text">
        <h1>{props.restaurantInfo.name}</h1>
        <p>{props.restaurantInfo.description}</p>
      </div>

      <img
        className="restaurant-info-picture"
        src={props.restaurantInfo.picture}
        alt="restaurant"
      />
    </div>
  );
};
export default Restaurant;
