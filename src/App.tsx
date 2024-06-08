import "./App.css";
import OrderList from "./components/OrderList";
import ServiceList from "./components/ServiceList";
import DiscountList from "./components/DiscountList";
import { useEffect, useState } from "react";
import axios from "axios";

const url: string =
  "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData";

interface Service {
  count: number;
  name: string;
  price: number;
}

interface Discount {
  name: string;
  rate: number;
}

function App() {
  const [isServiceListOpen, setIsServiceListOpen] = useState(false);
  const [isDiscountListOpen, setIsDiscountListOpen] = useState(false);

  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: Service;
  }>({});

  const [appliedDiscount, setAppliedDiscount] = useState<{
    [key: string]: Discount;
  }>({});

  const [items, setItems] = useState<{ [key: string]: Service }>({});
  const [discounts, setDiscounts] = useState<{ [key: string]: Discount }>({});
  const [currencyCode, setCurrencyCode] = useState<string>("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setItems(data.items);
        setDiscounts(data.discounts);
        setCurrencyCode(data.currency_code);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>Colavo App</h1>
      <OrderList
        setIsServiceListOpen={setIsServiceListOpen}
        setIsDiscountListOpen={setIsDiscountListOpen}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        appliedDiscount={appliedDiscount}
        setAppliedDiscount={setAppliedDiscount}
        currencyCode={currencyCode}
      />
      {isServiceListOpen && (
        <ServiceList
          setIsServiceListOpen={setIsServiceListOpen}
          items={items}
          currencyCode={currencyCode}
          setSelectedServices={setSelectedServices}
          selectedServices={selectedServices}
        />
      )}
      {isDiscountListOpen && (
        <DiscountList
          setIsDiscountListOpen={setIsDiscountListOpen}
          discounts={discounts}
          appliedDiscount={appliedDiscount}
          setAppliedDiscount={setAppliedDiscount}
          selectedServices={selectedServices}
        />
      )}
    </>
  );
}

export default App;
