// import React from "react";

// type Review = {
//     name: string;
//     rating: number;
//     text: string;
//     image: string;
// };

// const reviews: Review[] = [
//     {
//         name: "Maria",
//         rating: 5,
//         text: "Les meilleures Meuble que j'ai jamais eues de votre part. Excellente qualité et meilleur traitement 💯",
//         image: "https://placehold.co/300x400?text=Image+1"
//     },
//     {
//         name: "Aicha",
//         rating: 5,
//         text: "",
//         image: "https://placehold.co/300x400?text=Image+2"
//     },
//     {
//         name: "Ahmed",
//         rating: 4,
//         text: "Honnêtement, bonne qualité et Zawina",
//         image: "https://placehold.co/300x400?text=Image+3"
//     }
// ];

// const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//         if (i < rating) {
//             stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
//         } else {
//             stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
//         }
//     }
//     return <div className="flex">{stars}</div>;
// };

// const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
//         <img src={review.image} alt={`Review by ${review.name}`} className="w-full h-64 object-cover" />
//         <div className="p-4">
//             <h3 className="text-center font-bold text-lg">{review.name}</h3>
//             <div className="flex justify-center my-2">
//                 <StarRating rating={review.rating} />
//             </div>
//             <p className="text-center text-gray-700">{review.text}</p>
//         </div>
//     </div>
// );

// const Packs = () => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
//       <img
//         src={review.image}
//         alt={`Review by ${review.name}`}
//         className="w-full h-64 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-center font-bold text-lg">{review.name}</h3>
//         <div className="flex justify-center my-2">
//           <StarRating rating={review.rating} />
//         </div>
//         <p className="text-center text-gray-700">{review.text}</p>
//       </div>
//     </div>
//   );
// };

// export default Packs;

import React from 'react'

const Packs = () => {
  return (
    <div>Packs</div>
  )
}

export default Packs