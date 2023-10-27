'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
//images
import bug from "../assets/types/bug.png";
import dark from "../assets/types/dark.svg";
import dragon from "../assets/types/dragon.png";
import electric from "../assets/types/electric.svg";
import fairy from "../assets/types/fairy.svg";
import fighting from "../assets/types/fighting.svg";
import fire from "../assets/types/fire.png";
import flying from "../assets/types/flying.png";
import ghost from "../assets/types/ghost.png";
import grass from "../assets/types/grass.png";
import ground from "../assets/types/ground.svg";
import ice from "../assets/types/ice.svg";
import normal from "../assets/types/normal.svg";
import poison from "../assets/types/poison.svg";
import psychic from "../assets/types/psychic.svg";
import rock from "../assets/types/rock.svg";
import steel from "../assets/types/steel.svg";
import water from "../assets/types/water.svg";

//mapping images
const typeImageMapping = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
}

//-------------------------------------------------
const Card = ({ name }) => {
  const [details, setDetails] = useState({})

  useEffect(() => {
    const getDetails = async ()=>{
      let data =  await fetch(`http://localhost:3000/api/pokemon/${name}`)
      data = await data.json()
      setDetails(data)
    }
    getDetails()
  }, [])
  

  return (
    <div className="card">
      <div className="card-name">{name.toUpperCase()}</div>

      <div className="card-img-container">
        {details.sprites?<Image
          className="card-img"
          fill={true}
          src={details.sprites?.other.dream_world.front_default}
          alt="image"
        />:<>No Image</>}
        
      </div>
      {/* ELEMENT TYPES OF POKEMON  */}
      <div className="elements">
        {details.types?.map((t, index) => (
          <div key={index} className="elem-img-container">
            {/* {console.log(t.type)} */}
            <Image
              className="elem-img"
              fill={true}
              src={typeImageMapping[t.type.name]}
              alt="type"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
