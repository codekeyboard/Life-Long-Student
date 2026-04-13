
const Card = (props) => {
    return (
        <div>
          <div className="card">
            <img src={props.image} alt="Profile" />
            <h1>{props.user}</h1>
            <p>{props.data}</p>
            <button>View Profile</button>
          </div>
        </div>
    );
}

export default Card;