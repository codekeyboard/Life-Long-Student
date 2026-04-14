import React from "react";
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";

const App = () => {
  const cards = [
    {
      id: 1,
      number: "1",
      title: "Satisfied",
      description:
        "Build customer groups from behavior patterns and uncover who responds best to your product messaging.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop",
    },
    {
      id: 2,
      number: "2",
      title: "Retention",
      description:
        "Track repeat engagement and identify which segments are most likely to stay active over time.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=987&auto=format&fit=crop",
    },
    {
      id: 3,
      number: "3",
      title: "Growth",
      description:
        "Compare acquisition channels and spotlight the audiences that create stronger long-term value.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop",
    },
  ];

  return (
    <div>
      <Section1 cards={cards} />
      <Section2 />
    </div>
  );
};

export default App;
