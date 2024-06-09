import React, { useEffect, useState } from "react";
import {
  Btn,
  CloseIcon,
  Container,
  FooterContainer,
  HeaderContainer,
  HeaderTextWrapper,
  ListContainer,
  ListWrapper,
  RowContainer,
  TextContainer,
} from "./styledComponents";
import { FaPlusCircle } from "react-icons/fa";

import { colors } from "../styles/theme";
import { formatPrice } from "./utils";
import ItemSelector from "./ItemSelector";

interface Service {
  count: number;
  name: string;
  price: number;
}
interface Discount {
  name: string;
  rate: number;
  applied?: {
    [key: string]: Service;
  };
}
interface OrderListProps {
  setIsDiscountListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsServiceListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServices: {
    [key: string]: Service;
  };
  setSelectedServices: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Service;
    }>
  >;
  currencyCode: string;
  appliedDiscount: {
    [key: string]: Discount;
  };
  setAppliedDiscount: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Discount;
    }>
  >;
}

const OrderList: React.FC<OrderListProps> = ({
  setIsDiscountListOpen,
  setIsServiceListOpen,
  selectedServices,
  setSelectedServices,
  currencyCode,
  appliedDiscount,
  setAppliedDiscount,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [currentOpenPopup, setCurrentOpenPopup] = useState<string | null>(null);

  useEffect(() => {
    let totalNumber = 0;
    Object.keys(selectedServices).forEach((key) => {
      totalNumber += selectedServices[key].price * selectedServices[key].count;
    });
    setTotalAmount(totalNumber);

    let totalDiscount = 0;
    Object.keys(appliedDiscount).forEach((discountKey) => {
      const discount = appliedDiscount[discountKey];
      if (discount.applied) {
        Object.keys(discount.applied).forEach((serviceKey) => {
          const service = discount.applied[serviceKey];
          totalDiscount += service.price * service.count * discount.rate;
        });
      }
    });
    setDiscountAmount(totalDiscount);
  }, [selectedServices, appliedDiscount]);

  const finalAmount = totalAmount - discountAmount;

  return (
    <Container>
      <HeaderContainer>
        <CloseIcon />
        <HeaderTextWrapper>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Alice
          </p>
          <p>2024.06.14 오후 6:30</p>
        </HeaderTextWrapper>
      </HeaderContainer>
      <RowContainer>
        <Btn
          style={{ display: "flex", justifyContent: "center" }}
          $bgcolor={colors.gray}
          color={colors.darkGray}
          onClick={() => setIsServiceListOpen(true)}
        >
          <FaPlusCircle />
          시술
        </Btn>
        <Btn
          style={{ display: "flex", justifyContent: "center" }}
          $bgcolor={colors.pink}
          color={colors.darkPink}
          onClick={() => setIsDiscountListOpen(true)}
        >
          <FaPlusCircle />
          할인
        </Btn>
      </RowContainer>
      <ListWrapper>
        {selectedServices &&
          Object.keys(selectedServices).map((key) => (
            <ListContainer key={key}>
              <TextContainer>
                <h3>{selectedServices[key]?.name}</h3>
                <p>{formatPrice(selectedServices[key].price, currencyCode)}</p>
              </TextContainer>
              <ItemSelector
                id={key}
                type={"services"}
                title={selectedServices[key]?.name}
                placeholder={selectedServices[key].count}
                currentOpenPopup={currentOpenPopup}
                setCurrentOpenPopup={setCurrentOpenPopup}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
              />
            </ListContainer>
          ))}
        {appliedDiscount &&
          Object.keys(appliedDiscount).map((key) => (
            <ListContainer key={key}>
              <TextContainer>
                <h3>{appliedDiscount[key].name}</h3>
                {appliedDiscount[key].applied &&
                  Object.keys(appliedDiscount[key].applied).length > 0 && (
                    <>
                      {Object.keys(appliedDiscount[key].applied).map(
                        (appliedKey) => (
                          <span key={appliedKey}>
                            {appliedDiscount[key].applied[appliedKey].name},{" "}
                          </span>
                        )
                      )}
                    </>
                  )}
                <p style={{ color: colors.darkPink, fontWeight: "bold" }}>
                  ({(appliedDiscount[key].rate * 100).toFixed(0)}%)
                </p>
              </TextContainer>
              <ItemSelector
                id={key}
                type={"discounts"}
                placeholder="수정"
                title={appliedDiscount[key]?.name}
                selectedServices={selectedServices}
                currencyCode={currencyCode}
                currentOpenPopup={currentOpenPopup}
                setCurrentOpenPopup={setCurrentOpenPopup}
                setAppliedDiscount={setAppliedDiscount}
                appliedDiscount={appliedDiscount}
              />
            </ListContainer>
          ))}
      </ListWrapper>
      <FooterContainer>
        <RowContainer style={{ padding: "0 10px", color: "black" }}>
          <p>합계</p>
          <h3>{formatPrice(finalAmount, currencyCode)}</h3>
        </RowContainer>
        <Btn $bgcolor={colors.purple} width={"320px"} color={colors.white}>
          다음
        </Btn>
      </FooterContainer>
    </Container>
  );
};

export default OrderList;
