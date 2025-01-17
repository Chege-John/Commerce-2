"use client";

const BuyButton = ({ productName, productPrice }) => {
  const handleBuy = () => {
    const message = `Hello, I would like to buy the following product:\n\nProduct: ${productName}\nPrice: Kes ${productPrice}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/+254724849138?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappUrl;
  };

  return (
    <button
      className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white"
      onClick={handleBuy}
    >
      Buy Now
    </button>
  );
};

export default BuyButton;
