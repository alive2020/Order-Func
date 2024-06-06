import React, { useState } from "react";
import {
  Btn,
  Container,
  FooterContainer,
  ListContainer,
  ListWrapper,
  RowContainer,
  ServiceFooter,
  TextContainer,
} from "./styledComponents";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { colors } from "../styles/theme";
import { FaCheck } from "react-icons/fa6";
import { formatPrice } from "./utils";

interface ServiceListProps {
  items: {
    [key: string]: {
      count: number;
      name: string;
      price: number;
    };
  };
  currencyCode: string;
  setSelectedServices: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        count: number;
        name: string;
        price: number;
      };
    }>
  >;
  setIsServiceListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceList: React.FC<ServiceListProps> = ({
  items,
  currencyCode,
  setSelectedServices,
  setIsServiceListOpen,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (key: string) => {
    const isSelected = selectedItems.includes(key);
    const newSelectedItems = isSelected
      ? selectedItems.filter((item) => item !== key)
      : [...selectedItems, key];

    setSelectedItems(newSelectedItems);

    const addedServices = Object.fromEntries(
      Object.entries(items).filter(([key]) => newSelectedItems.includes(key))
    );
    setSelectedServices(addedServices);
  };

  console.log("items", items);

  return (
    <Container className="popup">
      <RowContainer>
        <IoClose
          style={{ fontSize: "36px", color: `${colors.darkGray}` }}
          onClick={() => setIsServiceListOpen(false)}
        />
        <p>시술메뉴</p>
        <FaPlus style={{ fontSize: "26px", color: `${colors.darkGray}` }} />
      </RowContainer>
      <ListWrapper height={"520px"}>
        {Object.keys(items).map((key) => (
          <ListContainer key={key} onClick={() => handleItemClick(key)}>
            <TextContainer>
              <h3>{items[key].name}</h3>
              <p>{formatPrice(items[key].price, currencyCode)}</p>
            </TextContainer>
            {selectedItems.includes(key) && (
              <FaCheck style={{ color: colors.purple, fontSize: "26px" }} />
            )}
          </ListContainer>
        ))}
      </ListWrapper>
      <ServiceFooter bgColor={colors.purple}>
        <p>서비스를 선택하세요(여러 개 선택가능)</p>
        <Btn
          bgColor={colors.lightPurple}
          width={"320px"}
          onClick={() => setIsServiceListOpen(false)}
        >
          완료
        </Btn>
      </ServiceFooter>
    </Container>
  );
};

export default ServiceList;
