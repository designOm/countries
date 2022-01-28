import React, { HTMLAttributes, ReactHTMLElement, useRef } from "react";
import styled from "styled-components";
import Portal from "../PortalsModals";
import { Backdrop, boxShadow, inputSurface } from "../styled-components";

type clickHandlerFunction<T> = (event: React.MouseEvent, option: T) => void;

interface Props<T> extends HTMLAttributes<HTMLOrSVGElement> {
  options: T[];
  getSelected?: (option: T) => void;
  renderOption?: (
    option: T,
    onClickHandler: clickHandlerFunction<T>
  ) => React.ReactNode;
  listWrapperComponent?: React.ElementType;
  listChildComponent?: React.ElementType;
}

const SelectInput = <T extends {}>({
  listWrapperComponent: Parent = "ul",
  listChildComponent: Child = "li",
  ...restProps
}: Props<T>) => {
  const { options, renderOption, getSelected } = restProps;
  const [btnEl, setBtnEL] = React.useState<HTMLElement | null>(null); // You can use type T in List function scope.
  const [selectedOption, setSelectedOption] = React.useState<T | null>(null);

  const btnRef = useRef<null>(null);


  const handleItemClick = (event: React.MouseEvent, option: T) => {
    event.preventDefault();
    setSelectedOption(option);
    if (getSelected) getSelected(option);
  };

  return (
    <div>
      <ContinentButton
        ref={btnRef}
        onClick={(event) => setBtnEL(event.target as HTMLElement)}
      >
        {selectedOption ?? "Select Continents"}
      </ContinentButton>
      {btnEl && (
        <DropDownPortal>
          <Backdrop transparent onClick={() => setBtnEL(null)} />
          <Parent className="dropdown-parent">
            {options.map((option) => {
              if (renderOption) return renderOption(option, handleItemClick);
              else
                return (
                  <Child key={option} onClick={handleItemClick}>
                    {option}
                  </Child>
                );
            })}
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
`
const DropDownPortal = styled(Portal)`
  .dropdown-parent{
    position: fixed;
  }
`
export default SelectInput;
