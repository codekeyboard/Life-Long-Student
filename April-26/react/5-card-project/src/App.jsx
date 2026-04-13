import Card from "./components/Card.jsx";


const App = () => {

  const cardData = [{
    image: "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
    saveStatus: "Save",
    title: "Amazon",
    position: "Senior UI/UX Designer",
    type: "Full Time",
    level: "Senior",
    salary: "$120/hr",
    location: "Pakistan, Lahore",
    postedDate: "2 days ago"
  },
  {
    image: "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
    saveStatus: "Save",
    title: "Amazon",
    position: "Senior UI/UX Designer",
    type: "Full Time",
    level: "Senior",
    salary: "$120/hr",
    location: "Pakistan, Lahore",
    postedDate: "2 days ago"
  },
  {
    image: "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
    saveStatus: "Save",
    title: "Amazon",
    position: "Senior UI/UX Designer",
    type: "Full Time",
    level: "Senior",
    salary: "$120/hr",
    location: "Pakistan, Lahore",
    postedDate: "2 days ago"
  },
  {
    image: "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
    saveStatus: "Save",
    title: "Amazon",
    position: "Senior UI/UX Designer",
    type: "Full Time",
    level: "Senior",
    salary: "$120/hr",
    location: "Pakistan, Lahore",
    postedDate: "2 days ago"
  },{
    image: "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D",
    saveStatus: "Save",
    title: "Amazon",
    position: "Senior UI/UX Designer",
    type: "Full Time",
    level: "Senior",
    salary: "$120/hr",
    location: "Pakistan, Lahore",
    postedDate: "2 days ago"
  }];
  return(
    <div className="parent">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  )
}

export default App;
