import React, { useEffect, useState } from "react";
import {
  Btn,
  Container,
  FooterContainer,
  HeaderContainer,
  HeaderTextWrapper,
  ListContainer,
  ListWrapper,
  RowContainer,
  TextContainer,
} from "./styledComponents";
import { IoClose } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";

import { colors } from "../styles/theme";
import { formatPrice } from "./utils";
import CountSelector from "./CountSelector";

interface OrderListProps {
  setIsDiscountListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsServiceListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServices: {
    [key: string]: { count: number; name: string; price: number };
  };
  currencyCode: string;
}

const OrderList: React.FC<OrderListProps> = ({
  setIsDiscountListOpen,
  setIsServiceListOpen,
  selectedServices,
  currencyCode,
  appliedDiscount,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalNumber = 0;
    Object.keys(selectedServices).forEach((key) => {
      totalNumber += selectedServices[key].price;
      console.log("totalNumber");
    });
    setTotalAmount(totalNumber);
  }, [selectedServices, appliedDiscount]);

  return (
    <Container>
      <HeaderContainer>
        <IoClose style={{ flex: "0 0 auto", fontSize: "36px" }} />
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
          bgColor={colors.gray}
          color={colors.darkGray}
          onClick={() => setIsServiceListOpen(true)}
        >
          <FaPlusCircle />
          시술
        </Btn>
        <Btn
          bgColor={colors.pink}
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
              <CountSelector
                title={selectedServices[key]?.name}
                count={selectedServices[key].count}
              />
            </ListContainer>
          ))}
        {appliedDiscount &&
          Object.keys(appliedDiscount).map((key) => (
            <ListContainer key={key}>
              <TextContainer>
                <h3>{appliedDiscount[key].name}</h3>
                <p style={{ color: colors.darkPink, fontWeight: "bold" }}>
                  ({(appliedDiscount[key].rate * 100).toFixed(0)}%)
                </p>
              </TextContainer>
              <CountSelector title={selectedServices[key]?.name} />
            </ListContainer>
          ))}
      </ListWrapper>
      <FooterContainer>
        <RowContainer style={{ padding: "0 10px", color: "black" }}>
          <p>합계</p>
          <h3>{formatPrice(totalAmount, currencyCode)}</h3>
        </RowContainer>
        <Btn bgColor={colors.purple} width={"320px"} color={colors.white}>
          다음
        </Btn>
      </FooterContainer>
    </Container>
  );
};

export default OrderList;
