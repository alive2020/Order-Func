import React, { useEffect, useRef, useState } from "react";
import {
  Btn,
  ListContainer,
  NumberItem,
  Popup,
  PopupInnerContainer,
  RowContainer,
  ScrollableContainer,
  SelectorBtn,
  TextContainer,
} from "./styledComponents";
import { colors } from "../styles/theme";
import { formatPrice } from "./utils";
import { FaCheck } from "react-icons/fa6";

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

interface Services {
  [key: string]: Service;
}

interface Discounts {
  [key: string]: Discount;
}

interface ItemSelectorProps {
  selectedServices: {
    [key: string]: Service;
  };
  placeholder: string | number;
  title: string;
  type: "services" | "discounts";
  currencyCode?: string;
  currentOpenPopup: string | null;
  setCurrentOpenPopup: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
  setSelectedServices: React.Dispatch<React.SetStateAction<Services>>;
  appliedDiscount: Discounts;
  setAppliedDiscount: React.Dispatch<React.SetStateAction<Discounts>>;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  placeholder,
  title,
  type,
  currencyCode,
  currentOpenPopup,
  setCurrentOpenPopup,
  id,
  setSelectedServices,
  selectedServices,
  setAppliedDiscount,
  appliedDiscount,
}) => {
  const [temporaryCount, setTemporaryCount] = useState<number>(1);
  const [localSelectedItems, setLocalSelectedItems] = useState<string[]>([]);
  const [persistentSelectedItems, setPersistentSelectedItems] = useState<
    string[]
  >([]);

  const isOpen = currentOpenPopup === id;
  const popupRef = useRef();
  const containerRef = useRef();
  const itemRefs = useRef({});

  const numbers = Array.from({ length: 100 }, (_, index) => index + 1);

  const handleItemClick = (key: string) => {
    const isSelected = localSelectedItems.includes(key);
    const newSelectedItems = isSelected
      ? localSelectedItems.filter((item) => item !== key)
      : [...localSelectedItems, key];

    setLocalSelectedItems(newSelectedItems);
  };

  const handleApplyDiscounts = () => {
    if (localSelectedItems.length === 0) {
      handleDeleteDiscount();
    } else if (appliedDiscount && appliedDiscount[id]) {
      const selectedAppliedServices = localSelectedItems.reduce(
        (acc, itemId) => {
          if (selectedServices && selectedServices[itemId]) {
            acc[itemId] = selectedServices[itemId];
          }
          return acc;
        },
        {}
      );

      setAppliedDiscount({
        ...appliedDiscount,
        [id]: {
          ...appliedDiscount[id],
          applied: selectedAppliedServices,
        },
      });
    }
    setPersistentSelectedItems(localSelectedItems);
    setCurrentOpenPopup(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current?.contains(event.target as Node)) {
      setCurrentOpenPopup(null);
    }
  };

  const handleDeleteDiscount = () => {
    const updatedDiscounts = Object.fromEntries(
      Object.entries(appliedDiscount).filter(([key]) => key !== id)
    );

    setAppliedDiscount(updatedDiscounts);
  };

  const handleDeleteService = () => {
    const updatedServices = Object.fromEntries(
      Object.entries(selectedServices).filter(([key]) => key !== id)
    );
    setSelectedServices(updatedServices);
  };

  const handleCountSelect = (count: number) => {
    setTemporaryCount(count);
  };

  const handleSaveCount = () => {
    const updatedServices = {
      ...selectedServices,
      [id]: {
        ...selectedServices[id],
        count: temporaryCount,
      },
    };
    setSelectedServices(updatedServices);
    setCurrentOpenPopup(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const appliedServices = appliedDiscount?.[id]?.applied || {};
      setLocalSelectedItems(Object.keys(appliedServices));
      setPersistentSelectedItems(Object.keys(appliedServices));
    }
  }, [isOpen, appliedDiscount, id]);

  useEffect(() => {
    if (isOpen && containerRef.current && itemRefs.current[temporaryCount]) {
      const container = containerRef.current;
      const item = itemRefs.current[temporaryCount];
      const itemOffsetTop = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const containerHeight = container.clientHeight;
      container.scrollTop =
        itemOffsetTop - containerHeight / 1.2 + itemHeight / 1.2;
    }
  }, [isOpen, temporaryCount]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <SelectorBtn
        style={{ outline: "none" }}
        onClick={() => {
          setCurrentOpenPopup(id);
        }}
      >
        {type === "services" ? selectedServices[id]?.count : placeholder}
      </SelectorBtn>

      {isOpen && (
        <Popup ref={popupRef}>
          {type === "services" ? (
            <>
              <p style={{ margin: "10px 20px", fontWeight: "bold" }}>{title}</p>
              <ScrollableContainer ref={containerRef}>
                {numbers.map((number) => (
                  <NumberItem
                    ref={(el) => (itemRefs.current[number] = el)}
                    key={number}
                    onClick={() => handleCountSelect(number)}
                    style={{
                      backgroundColor:
                        temporaryCount === number
                          ? colors.purple
                          : "transparent",
                      color: temporaryCount === number ? colors.white : "black",
                    }}
                  >
                    {number}
                  </NumberItem>
                ))}
              </ScrollableContainer>
              <RowContainer>
                <Btn
                  style={{
                    fontWeight: "bold",
                    border: `1px solid ${colors.gray}`,
                  }}
                  color={colors.darkPink}
                  onClick={() => handleDeleteService(id)}
                >
                  삭제
                </Btn>
                <Btn
                  style={{ fontWeight: "bold" }}
                  color={colors.white}
                  $bgcolor={colors.purple}
                  onClick={handleSaveCount}
                >
                  완료
                </Btn>
              </RowContainer>
            </>
          ) : (
            <>
              <p style={{ margin: "10px 20px", fontWeight: "bold" }}>
                여름 프로모션
              </p>
              <PopupInnerContainer height={"200px"}>
                {Object.keys(selectedServices).map((key) => (
                  <ListContainer
                    style={{ paddingLeft: "20px" }}
                    key={key}
                    onClick={() => handleItemClick(key)}
                  >
                    <TextContainer>
                      <h5>{selectedServices[key].name}</h5>
                      <p>
                        {formatPrice(selectedServices[key].price, currencyCode)}
                      </p>
                    </TextContainer>
                    {localSelectedItems.includes(key) && (
                      <FaCheck
                        style={{
                          color: colors.purple,
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                  </ListContainer>
                ))}
              </PopupInnerContainer>
              <RowContainer>
                <Btn
                  style={{
                    fontWeight: "bold",
                    border: `1px solid ${colors.gray}`,
                  }}
                  color={colors.darkPink}
                  onClick={handleDeleteDiscount}
                >
                  삭제
                </Btn>
                <Btn
                  $bgcolor={colors.purple}
                  style={{
                    fontWeight: "bold",
                  }}
                  color={colors.white}
                  onClick={handleApplyDiscounts}
                >
                  완료
                </Btn>
              </RowContainer>
            </>
          )}
        </Popup>
      )}
    </div>
  );
};

export default ItemSelector;
