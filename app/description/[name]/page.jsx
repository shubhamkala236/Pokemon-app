import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

//server side rendering of data from external funtion getdata
async function getData(name) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  let data = await res.json();
  return data;
}

//----------------------------------------------------------------

// JSX component with its functions and html
const page = async ({ params }) => {
  let details = await getData(params.name);
  let types = details.types;


  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h1 className={styles.item}>{details.name.toUpperCase()}</h1>
        <h3 className={styles.item}>
          Type -
          {types.map((item) => (
            <span key={item.type.name}> {item.type.name.toUpperCase()} </span>
          ))}
        </h3>
      </div>
      <div className={styles.img}>
        <div className={styles.img_container}>
          <Image
            className={styles.img_pokemon}
            fill={true}
            src={details.sprites.other.dream_world.front_default}
            alt="image"
          />
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.left_stat}>
          <div className={styles.item_stat}>HP : {details.stats[0].base_stat}</div>
          <div className={styles.item_stat}>ATTACK: {details.stats[1].base_stat}</div>
          <div className={styles.item_stat}>DEFENCE: {details.stats[2].base_stat}</div>
          <div className={styles.item_stat}>SPECIAL-ATTACK: {details.stats[3].base_stat}</div>
          <div className={styles.item_stat}>SPECIAL-DEFENCE: {details.stats[4].base_stat}</div>
          <div className={styles.item_stat}>SPEED: {details.stats[5].base_stat}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
