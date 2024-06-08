import React, { useEffect, useState } from "react";
import {
  AddIcon,
  BackgroundFooter,
  Btn,
  CloseIcon,
  Container,
  ListContainer,
  ListWrapper,
  RowContainer,
  TextContainer,
} from "./styledComponents";
import { colors } from "../styles/theme";
import { FaCheck } from "react-icons/fa6";

interface Service {
  count: number;
  name: string;
  price: number;
}
interface Discount {
  name: string;
  rate: number;
}

interface DiscountListProps {
  discounts: {
    [key: string]: Discount;
  };
  setIsDiscountListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAppliedDiscount: React.Dispatch<
    React.SetStateAction<{ [key: string]: Discount }>
  >;
  appliedDiscount: {
    [key: string]: Discount;
  } | null;
  selectedServices: {
    [key: string]: Service;
  };
}

const DiscountList: React.FC<DiscountListProps> = ({
  discounts,
  setIsDiscountListOpen,
  setAppliedDiscount,
  appliedDiscount,
  selectedServices,
}) => {
  const [localSelectedDiscounts, setLocalSelectedDiscounts] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (appliedDiscount) {
      setLocalSelectedDiscounts(Object.keys(appliedDiscount));
    } else {
      setLocalSelectedDiscounts([]);
    }
  }, [appliedDiscount]);

  const handleItemClick = (key: string) => {
    const isSelected = localSelectedDiscounts.includes(key);
    const newSelectedDiscounts = isSelected
      ? localSelectedDiscounts.filter((item) => item !== key)
      : [...localSelectedDiscounts, key];

    setLocalSelectedDiscounts(newSelectedDiscounts);
  };

  const handleApplyDiscounts = () => {
    const appliedDiscounts = Object.fromEntries(
      Object.entries(discounts).filter(([key]) =>
        localSelectedDiscounts.includes(key)
      )
    );
    const updatedDiscounts = Object.keys(appliedDiscounts).reduce(
      (acc, key) => {
        acc[key] = {
          ...appliedDiscounts[key],
          applied: selectedServices,
        };
        return acc;
      },
      {}
    );

    setAppliedDiscount(updatedDiscounts);
    setIsDiscountListOpen(false);
  };

  return (
    <Container className="popup">
      <RowContainer>
        <CloseIcon onClick={() => setIsDiscountListOpen(false)} />
        <p>할인</p>
        <AddIcon />
      </RowContainer>
      <ListWrapper height={"520px"}>
        {Object.keys(discounts).map((key) => (
          <ListContainer key={key} onClick={() => handleItemClick(key)}>
            <TextContainer>
              <h3>{discounts[key].name}</h3>
              <p>{(discounts[key].rate * 100).toFixed(0)}%</p>
            </TextContainer>
            {localSelectedDiscounts.includes(key) && (
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
