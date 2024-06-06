import styled from "styled-components";

import { colors } from "../styles/theme";

interface BtnProps {
  width?: string;
  bgColor?: string;
  color?: string;
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
    z-index: 1000; /* Ensure it appears on top */
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

export const Btn = styled.div<BtnProps>`
  border-radius: 10px;
  width: ${(props) => props.width || "180px"};
  padding: 10px;
  margin: 10px;
  align-items: center !important;
  background-color: ${(props) => props.bgColor || "transparent"};
  color: ${(props) => props.color || "white"};
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.gray};
  position: relative;
  background-color: ${(props) => props.bgColor || "transparant"};
  color: white;
  /* height: 56px; */
`;

export const ListWrapper = styled.div`
  height: ${(props) => props.height || "460px"};
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const ListContainer = styled(RowContainer)`
  padding: 10px;
  position: relative;
  /* margin: 10px; */
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

export const ServiceFooter = styled(FooterContainer)`
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
