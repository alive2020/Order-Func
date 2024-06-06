import "./App.css";
import OrderList from "./components/OrderList";
import ServiceList from "./components/ServiceList";
import DiscountList from "./components/DiscountList";
import { useState } from "react";

function App() {
  const [isServiceListOpen, setIsServiceListOpen] = useState(false);
  const [isDiscountListOpen, setIsDiscountListOpen] = useState(false);
  return (
    <>
      <h1>Colavo App</h1>
      <OrderList />
      {isServiceListOpen && <ServiceList />}
      {isDiscountListOpen && <DiscountList />}
    </>
  );
}

export default App;
