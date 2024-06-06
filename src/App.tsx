import "./App.css";
import OrderList from "./components/OrderList";
import ServiceList from "./components/ServiceList";
import DiscountList from "./components/DiscountList";
import { useEffect, useState } from "react";
import axios from "axios";

const url: string =
  "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData";

function App() {
  const [isServiceListOpen, setIsServiceListOpen] = useState(false);
  const [isDiscountListOpen, setIsDiscountListOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<any[]>([]); // Replace with service object type
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  // console.log("isServiceListOpen", isServiceListOpen);
  // console.log("isDiscountListOpen", isDiscountListOpen);

  const [items, setItems] = useState({});
  const [discounts, setDiscounts] = useState({});
  const [currencyCode, setCurrencyCode] = useState("");

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

  // console.log("items", items);
  // console.log("discounts", discounts);
  // console.log("currencyCode", currencyCode);
  console.log("selectedServices", selectedServices);

  return (
    <>
      <h1>Colavo App</h1>
      <OrderList
        selectedServices={selectedServices}
        appliedDiscount={appliedDiscount}
        setIsServiceListOpen={setIsServiceListOpen}
        setIsDiscountListOpen={setIsDiscountListOpen}
        currencyCode={currencyCode}
      />
      {isServiceListOpen && (
        <ServiceList
          items={items}
          currencyCode={currencyCode}
          setSelectedServices={setSelectedServices}
          setIsServiceListOpen={setIsServiceListOpen}
        />
      )}
      {isDiscountListOpen && <DiscountList discounts={discounts} />}
    </>
  );
}

export default App;
