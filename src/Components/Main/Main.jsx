import React, {useEffect} from "react";
import "./main.css";
import img1 from "../../Assets/img1.jpg";
import img2 from "../../Assets/img2.jpg";
import img3 from "../../Assets/img3.jpg";

import { IoLocationSharp } from "react-icons/io5";
import { FaClipboard } from "react-icons/fa6";

import Aos from "aos";
import "aos/dist/aos.css";

const Data = [
  {id:1,
  imgSrc: img1,
  destTitle: "Bali",
  location: "Indonesia",
  grade: "Cultural & Nature",
  fees: "$700",
  description: "Bali is a tropical paradise known for its stunning beaches, lush rice terraces, and vibrant culture. It's a top destination for relaxation and adventure.",
  },
  {id:2,
  imgSrc: img2,
  destTitle: "Paris",
  location: "France",
  grade: "Cultural & Romantic",
  fees: "$1200",
  description: "Paris, the City of Light, is famous for its art, fashion, and history. Explore iconic landmarks like the Eiffel Tower and Louvre Museum.",
  },
  {id:3,
  imgSrc: img3,
  destTitle: "Tokyo",
  location: "Japan",
  grade: "Cultural & Modern",
  fees: "$1500",
  description: "Tokyo is a bustling metropolis that seamlessly blends tradition and modernity. Experience its vibrant culture, technology, and cuisine.",
  }
]

const Main = () => {

  useEffect(() => {
    Aos.init({duration: 2000});
  },[]);

  return (
    <section className="main container section">

      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Most Visited Destinations
        </h3>
      </div>

      <div className="secContent grid">
        {
          Data.map(({id,imgSrc,destTitle,location,grade,fees,description})=>{
            return(
              <div data-aos="fade-up" key={id} className="singleDestination">

                <div className="imgDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">
                    {destTitle}
                  </h4>
                  <span className="continent flex">
                    <IoLocationSharp className="icon"/>
                    <span className="name">{location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{grade}<small>+1</small></span>
                    </div>
                    <div className="price">
                      <h5>{fees}</h5>
                    </div>
                  </div>

                  <div className="desc">
                      <p>{description}</p>
                  </div>

                  <button className="btn flex">
                    DETAILS <FaClipboard className="icon"/>
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>

    </section>
  );
}

export default Main;