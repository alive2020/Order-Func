import styled from "styled-components";

import { colors } from "../styles/theme";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

interface BtnProps {
  width?: string;
  $bgcolor?: string;
  color?: string;
}

interface FooterContainerProps {
  $bgcolor?: string;
}

interface ListWrapperProps {
  height?: string;
}

export const Container = styled.div`
  width: 360px;
  height: 700px;
  border-radius: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: relative;

  &.popup {
    position: absolute;
    top: 122px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    z-index: 1000;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTextWrapper = styled.div`
  flex: 1;

  p {
    font-size: 12px;
    padding: 0;
    margin: 0;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled(IoClose)`
  font-size: 36px;
  color: ${colors.darkGray};
  transition: opacity 0.6s ease, transform 0.9s ease;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const AddIcon = styled(FaPlus)`
  font-size: 26px;
  color: ${colors.darkGray};
  transition: opacity 0.6s ease, transform 0.9s ease;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const Btn = styled.div<BtnProps>`
  cursor: pointer;
  border-radius: 10px;
  width: ${(props) => props.width || "180px"};
  padding: 10px;
  margin: 10px;
  align-items: center !important;
  background-color: ${(props) => props.$bgcolor || "transparent"};
  color: ${(props) => props.color || "white"};
  transition: opacity 0.6s ease, transform 0.9s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.93);
  }
`;

export const FooterContainer = styled.div<FooterContainerProps>`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.gray};
  position: relative;
  background-color: ${(props) => props.$bgcolor || "transparant"};
  color: white;
`;

export const ListWrapper = styled.div<ListWrapperProps>`
  height: ${(props) => props.height || "460px"};
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;

export const ListContainer = styled(RowContainer)`
  padding: 10px;
  position: relative;
`;

export const TextContainer = styled.div`
  flex: 1;
  overflow: hidden;
  max-width: 86%;
  text-align: left;

  h3 {
    word-wrap: break-word;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
`;

export const BackgroundFooter = styled(FooterContainer)`
  z-index: -1;
  padding: 0 0 20px 0;
  margin: 0;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  width: 100%;
  left: 0;
  align-items: center;

  p {
    font-size: 12px;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

export const PopupOutline = styled.div`
  position: relative;
  :focus-visible {
    outline: none;
  }
`;

export const Popup = styled.div`
  background-color: white;
  position: absolute;
  top: 40px;
  right: 0;
  width: 260px;
  height: 260px;
  z-index: 100000;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 0;

  p {
    text-align: left;
  }
`;

export const SelectorBtn = styled.button`
  :focus,
  :focus-visible {
    outline: none !important;
    outline: 0px;
  }

  outline: none;
  &&:hover {
    border-color: ${colors.purple} !important;
  }
`;

export const ScrollableContainer = styled.div`
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  height: 150px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NumberItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CountSelectorContainer = styled.div`
  width: 50px;
  height: 100px;
  z-index: 100000;
  position: relative;
`;

export const PopupInnerContainer = styled(ListWrapper)`
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  height: 146px;

  h5 {
    padding: 0;
    margin: 0;
  }
`;
