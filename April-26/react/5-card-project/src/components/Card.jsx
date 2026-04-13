import {Bookmark} from "lucide-react"
const Card = (props) => {
    return (
        <div className="card">
            <div>
                <div className="top">
                <img src={props.image} alt="card image" className="card--image" />
                <button>{props.saveStatus}<Bookmark size={12}/></button>
            </div>
            <div className="center">
                <h3>{props.title} <span>{props.postedDate}</span></h3>
                <h2>{props.position}</h2>
                <div className="tag">
                    <h4>{props.type}</h4>
                    <h4>{props.level}</h4>
                </div>
            </div>
            </div>
            <div className="bottom">
                <div className="location">
                    <h3>{props.salary}</h3>
                    <p>{props.location}</p>
                </div>
                <div>
                    <button>Apply Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card;