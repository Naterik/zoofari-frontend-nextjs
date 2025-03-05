// import React from "react";
// import Link from "next/link";

// const Animals: React.FC = () => {
//   // Normally you would fetch this data from an API
//   const animals = [
//     { id: 1, name: "Elephant", image: "/images/elephant.jpg" },
//     { id: 2, name: "Elephant", image: "/images/elephant.jpg" },
//     { id: 3, name: "Elephant", image: "/images/elephant.jpg" },
//     { id: 4, name: "Elephant", image: "/images/elephant.jpg" },
//     { id: 5, name: "Elephant", image: "/images/elephant.jpg" },
//     { id: 6, name: "Elephant", image: "/images/elephant.jpg" },
//   ];

//   return (
//     <section className={styles.animals} id="animals">
//       <div className={styles.container}>
//         <div className={styles.heading}>
//           <span>Our Animals</span>
//           <h2>
//             Let`s See Our <span>Zoofari</span> Awesome Animals
//           </h2>
//         </div>

//         <div className={styles.animalGrid}>
//           {animals.map((animal) => (
//             <div key={animal.id} className={styles.animalCard}>
//               <div className={styles.image}>
//                 <img src={animal.image} alt={animal.name} />
//               </div>
//               <div className={styles.content}>
//                 <p>Animal</p>
//                 <h3>{animal.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Link href="/animals" className={styles.btnMore}>
//           Explore More Animals
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Animals;
