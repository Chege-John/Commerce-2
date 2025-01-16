"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import Skeleton from "./Skeleton";

//const images = [
//  {
//   id: 1,
//   url: "https://images.pexels.com/photos/6833984/pexels-photo-6833984.jpeg?auto=compress&cs=tinysrgb&w=400",
// },
// {
//   id: 2,
//   url: "https://images.pexels.com/photos/30061809/pexels-photo-30061809/free-photo-of-fashionable-woman-posing-with-colorful-headscarf.jpeg?auto=compress&cs=tinysrgb&w=400",
// },
// {
//   id: 3,
//  url: "https://images.pexels.com/photos/8433478/pexels-photo-8433478.jpeg?auto=compress&cs=tinysrgb&w=400",
// },
// {
//   id: 4,
//   url: "https://images.pexels.com/photos/28606334/pexels-photo-28606334/free-photo-of-elegant-prada-handbag-with-chain-detail.jpeg?auto=compress&cs=tinysrgb&w=400",
// },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Suspense fallback={<Skeleton />}>
          <Image
            src={items[index].image?.url}
            alt=""
            fill
            sizes="50vw"
            className="object-cover rounded-md"
          />
        </Suspense>
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            className="w-1/4 h-32 relative cursor-pointer gap-4 mt-8"
            onClick={() => setIndex(i)}
          >
            <Suspense fallback={<Skeleton />}>
              <Image
                src={item.image?.url}
                alt=""
                fill
                sizes="30vw"
                className="object-cover rounded-md"
              />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
