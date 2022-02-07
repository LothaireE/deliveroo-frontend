const Restaurant = (props) => {
  console.log(props);
  return (
    <div className="restaurant">
      <div>
        <h1>{props.restaurantInfo.name}</h1>
        <p>{props.restaurantInfo.description}</p>
      </div>

      <img
        className="restaurant-picture"
        src={props.restaurantInfo.picture}
        alt="restaurant"
      />
    </div>
  );
};
export default Restaurant;
