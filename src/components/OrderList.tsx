import React from "react";
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
}) => {
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
        {Object.keys(selectedServices).map((key) => (
          <ListContainer key={key}>
            <TextContainer>
              <h3>{selectedServices[key].name}</h3>
              <p>{formatPrice(selectedServices[key].price, currencyCode)}</p>
            </TextContainer>
          </ListContainer>
        ))}
      </ListWrapper>
      <FooterContainer>
        <RowContainer style={{ padding: "0 10px" }}>
          <p>합계</p>
          <h3>20000원</h3>
        </RowContainer>
        <Btn bgColor={colors.purple} width={"320px"} color={colors.white}>
          다음
        </Btn>
      </FooterContainer>
    </Container>
  );
};

export default OrderList;
