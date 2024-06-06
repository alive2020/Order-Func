import React, { useState } from "react";
import {
  BackgroundFooter,
  Btn,
  Container,
  ListContainer,
  ListWrapper,
  RowContainer,
  TextContainer,
} from "./styledComponents";
import { formatPrice } from "./utils";
import { colors } from "../styles/theme";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import { IoClose } from "react-icons/io5";

interface Discount {
  name: string;
  rate: number;
}

interface DiscountListProps {
  discounts: {
    [key: string]: Discount;
  };
  setIsDiscountListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currencyCode: string;
  setAppliedDiscount: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Discount;
    }>
  >;
}

const DiscountList: React.FC<DiscountListProps> = ({
  discounts,
  setIsDiscountListOpen,
  setAppliedDiscount,
  setSelectedDiscounts,
  selectedDiscounts,
}) => {
  console.log("discounts", discounts);

  const handleItemClick = (key: string) => {
    const isSelected = selectedDiscounts.includes(key);
    const newSelectedDiscounts = isSelected
      ? selectedDiscounts.filter((item) => item !== key)
      : [...selectedDiscounts, key];

    setSelectedDiscounts(newSelectedDiscounts);
  };

  const handleApplyDiscounts = () => {
    const appliedDiscounts = Object.fromEntries(
      Object.entries(discounts).filter(([key]) =>
        selectedDiscounts.includes(key)
      )
    );
    setAppliedDiscount(appliedDiscounts);
    setIsDiscountListOpen(false);
  };

  console.log("selectedDiscounts", selectedDiscounts);

  return (
    <Container className="popup">
      <RowContainer>
        <IoClose
          style={{ fontSize: "36px", color: `${colors.darkGray}` }}
          onClick={() => setIsDiscountListOpen(false)}
        />
        <p>할인</p>
        <FaPlus style={{ fontSize: "26px", color: `${colors.darkGray}` }} />
      </RowContainer>
      <ListWrapper height={"520px"}>
        {Object.keys(discounts).map((key) => (
          <ListContainer key={key} onClick={() => handleItemClick(key)}>
            <TextContainer>
              <h3>{discounts[key].name}</h3>
              <p>{(discounts[key].rate * 100).toFixed(0)}%</p>
            </TextContainer>
            {selectedDiscounts.includes(key) && (
              <FaCheck style={{ color: colors.purple, fontSize: "26px" }} />
            )}
          </ListContainer>
        ))}
      </ListWrapper>
      <BackgroundFooter bgColor={colors.purple}>
        <p>할인을 선택하세요(여러 개 선택가능)</p>
        <Btn
          bgColor={colors.lightPurple}
          width={"320px"}
          onClick={handleApplyDiscounts}
        >
          완료
        </Btn>
      </BackgroundFooter>
    </Container>
  );
};

export default DiscountList;
