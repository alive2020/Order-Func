import React, { useEffect, useState } from "react";
import {
  BackgroundFooter,
  Btn,
  Container,
  ListContainer,
  ListWrapper,
  RowContainer,
  TextContainer,
  CloseIcon,
  AddIcon,
} from "./styledComponents";
import { colors } from "../styles/theme";
import { FaCheck } from "react-icons/fa6";
import { formatPrice } from "./utils";

interface Service {
  count: number;
  name: string;
  price: number;
}
interface ServiceListProps {
  items: {
    [key: string]: Service;
  };
  currencyCode: string;
  setSelectedServices: React.Dispatch<
    React.SetStateAction<{ [key: string]: Service }>
  >;

  setIsServiceListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServices: {
    [key: string]: Service;
  };
}

const ServiceList: React.FC<ServiceListProps> = ({
  items,
  currencyCode,
  setSelectedServices,
  selectedServices,
  setIsServiceListOpen,
}) => {
  const [localSelectedItems, setLocalSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setLocalSelectedItems(Object.keys(selectedServices));
  }, [selectedServices]);

  const handleItemClick = (key: string) => {
    const isSelected = localSelectedItems.includes(key);
    const newSelectedItems = isSelected
      ? localSelectedItems.filter((item) => item !== key)
      : [...localSelectedItems, key];

    setLocalSelectedItems(newSelectedItems);
  };

  const handleAddServices = () => {
    const addedServices = Object.fromEntries(
      Object.entries(items).filter(([key]) => localSelectedItems.includes(key))
    );
    setSelectedServices(addedServices);
    setIsServiceListOpen(false);
  };

  return (
    <Container className="popup">
      <RowContainer>
        <CloseIcon onClick={() => setIsServiceListOpen(false)} />
        <p>시술메뉴</p>
        <AddIcon />
      </RowContainer>
      <ListWrapper height={"520px"}>
        {Object.keys(items).map((key) => (
          <ListContainer key={key} onClick={() => handleItemClick(key)}>
            <TextContainer>
              <h3>{items[key].name}</h3>
              <p>{formatPrice(items[key].price, currencyCode)}</p>
            </TextContainer>
            {localSelectedItems.includes(key) && (
              <FaCheck style={{ color: colors.purple, fontSize: "26px" }} />
            )}
          </ListContainer>
        ))}
      </ListWrapper>
      <BackgroundFooter $bgcolor={colors.purple}>
        <p>서비스를 선택하세요(여러 개 선택가능)</p>
        <Btn
          $bgcolor={colors.lightPurple}
          width={"320px"}
          onClick={handleAddServices}
        >
          완료
        </Btn>
      </BackgroundFooter>
    </Container>
  );
};

export default ServiceList;
