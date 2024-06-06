export const formatPrice = (price: number, currencyCode: string): string => {
  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);
  return currencyCode === "KRW"
    ? `${formattedPrice}원`
    : `${currencyCode} ${formattedPrice} `;
};
