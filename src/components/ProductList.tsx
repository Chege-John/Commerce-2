import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import BuyButton from "./BuyButton"; // Import the BuyButton component

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  // Ensure searchParams is defined and has necessary fields
  const {
    name = "",
    type,
    min = 0,
    max = 999999,
    sort,
    page,
  } = searchParams || {};

  // Validate search parameters before constructing the query
  if (!categoryId) {
    console.error("Category ID is missing");
    return null;
  }

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", name)
    .eq("collectionIds", categoryId)
    .hasSome("productType", type ? [type] : ["physical", "digital"])
    .gt("priceData.price", min)
    .lt("priceData.price", max)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(page ? parseInt(page) * (limit || PRODUCT_PER_PAGE) : 0);

  if (sort) {
    const [sortType, sortBy] = sort.split(" ");
    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  try {
    const res = await productQuery.find();
    return (
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {res.items.map((product: products.Product) => (
          <div
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <Link href={"/" + product.slug} className="flex flex-col gap-4">
              <div className="relative w-full h-80">
                <Image
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  quality={80}
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                />
                {product.media?.items && (
                  <Image
                    src={product.media?.items[1]?.image?.url || "/product.png"}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={80}
                    className="absolute object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">
                  Kes {product.price?.price}
                </span>
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
            </Link>
            <BuyButton
              productName={product.name}
              productPrice={product.price?.price}
            />
          </div>
        ))}
        {searchParams?.cat || searchParams?.name ? (
          <Pagination
            currentPage={res.currentPage || 0}
            hasPrev={res.hasPrev()}
            hasNext={res.hasNext()}
          />
        ) : null}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export default ProductList;
