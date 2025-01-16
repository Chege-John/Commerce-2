//"use client";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

const HomePage = async () => {
  //const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //    try {
  //      const res = await wixClient.products.queryProducts().find();
  //      console.log("res", res);
  //   } catch (error) {
  //      console.error("Error fetching products:", error);
  //     }
  //   };

  //   getProducts();
  //  }, [wixClient]);

  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();

  console.log("res", res);

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-12 xl:32 2xl:px-64">
        <h1 className="text-3xl font-bold tracking-wide">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      <div className="mt-24">
        <h1 className="text-3xl font-bold tracking-wide px-4 md:px-8 lg:px-12 xl:32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-12 xl:32 2xl:px-64">
        <h1 className="text-3xl font-bold tracking-wide">New Products</h1>
        <ProductList
          categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          limit={4}
        />
      </div>
    </div>
  );
};

export default HomePage;
