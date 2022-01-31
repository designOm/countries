import React, { HTMLAttributes, ReactHTMLElement, useRef } from "react";
import styled from "styled-components";
import Portal from "../PortalsModals";
import { Backdrop, boxShadow, inputSurface } from "../styled-components";

type clickHandlerFunction<T> = (event: React.MouseEvent, option: T) => void;

interface Props<T> extends HTMLAttributes<HTMLOrSVGElement> {
  label?: string;
  options: T[];
  getSelected?: (option: T) => void;
  renderOption: (
    option: T,
    onClickHandler: clickHandlerFunction<T>
  ) => React.ReactNode;
  listWrapperComponent?: React.ElementType;
  listChildComponent?: React.ElementType;
}

interface ListStyles {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  height?: number | string;
  width?: number | string;
}

const getAnchorStyles = (anchorEl: HTMLElement) => {
  const { top, left, right, bottom, width, height } =
    anchorEl.getBoundingClientRect();
  const thresholdBottom = window.innerHeight - height;

  const listStyles: ListStyles = { left, top: top + height + 2, width };

  if (top < 40) {
    listStyles.top = top + height + 2;
    listStyles.bottom = "unset";
  }

  if (thresholdBottom < 140) {
    listStyles.bottom = thresholdBottom + height + 2;
    listStyles.top = "unset";
  }

  return listStyles;
};

const SelectInput = <T extends {}>({
  listWrapperComponent: Parent = "ul",
  ...restProps
}: Props<T>) => {
  const { options, renderOption, getSelected, label } = restProps;
  const [btnEl, setBtnEL] = React.useState<HTMLElement | null>(null); // You can use type T in List function scope.
  // const [selectedOption, setSelectedOption] = React.useState<T | null>(null);

  const btnRef = useRef<null>(null);

  React.useEffect(() => {
    if(btnEl){
      window.setTimeout(() => {
       document.querySelector("body")?.classList.add("makeFixed")
      } , 10)
    }
    return () => {
      document.querySelector("body")?.classList.remove("makeFixed")
    }
  } , [btnEl])

  const handleItemClick = (event: React.MouseEvent, option: T) => {
    event.preventDefault();
    // setSelectedOption(option);
    if (getSelected) getSelected(option);

    setBtnEL(null)
  };

  return (
    <div>
      <ContinentButton
        ref={btnRef}
        onClick={(event) => setBtnEL(event.target as HTMLElement)}
      >
        {label ?? "Select Continents"}
      </ContinentButton>
      {btnEl && (
        <DropDownPortal>
          <Backdrop transparent onClick={() => setBtnEL(null)} />
          <Parent className="dropdown-parent" style={getAnchorStyles(btnEl)}>
            {options.map((option) => renderOption(option, handleItemClick))}
          </Parent>
        </DropDownPortal>
      )}
    </div>
  );
};

const ContinentButton = styled("button")`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${inputSurface}
  padding: 0 15px;
  ${boxShadow}
  min-width: 165px;
`;
const DropDownPortal = styled(Portal)`
  .dropdown-parent {
    position: fixed;
    z-index: 1101;
    background-color: var(--secondery);
    ${boxShadow}
    border-radius: 5px;
    list-style: none;
  }
  .dropdown-child {
    cursor: pointer;
    height: 40px;
    display: inline-flex;
    width: 100%;
    padding: 0 0 0 12px;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    &:hover{
      background-color: var(--primary);
    }
    &:last-child{
      border-bottom: none;
    }
  }
`;
export default SelectInput;
