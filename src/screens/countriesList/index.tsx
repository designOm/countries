import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/Search_black_24dp";
import CountryCard from "../../components/countryCard";
import SelectInput from "../../components/dropdown/inde";
import { AppContainer, boxShadow, inputSurface } from "../../components/styled-components";

function CountriesList() {
  return (
    <AppContainer>
      <Utility />
      <CountryCard />
    </AppContainer>
  );
}

interface utilityProps {
  className?: string;
}
const Utility = (props: utilityProps) => {
  return (
    <UtilitySection>
      <SearchBox className="searchBox">
        <input type="search" name="queryText" id="search" placeholder="Search by name " />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </SearchBox>
      <div className="continentFilter">
        <SelectInput
          options={["Asia", "Africa"]}
          //renderOption={(option , onClickHandler) => <div key={option} onClick={(event) =>  onClickHandler(event , option)}>{option}</div>}
          listWrapperComponent={"ul"}
          listChildComponent={"li"}
          getSelected={(selectedOption) => console.info(selectedOption)}
        />
      </div>
    </UtilitySection>
  );
};

const UtilitySection = styled("section")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  ${boxShadow}
  ${inputSurface}
  background-color: var(--secondery);
  color: var(--textColor);
  height: 40px;
  position: relative;
  .searchIcon{
    fill: var(--textColor);
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: inherit inherit 0 0;
    /* z-index: -1; */
    svg{
      fill: inherit;
    }
  }
  input{
    padding-left: 40px;
    height: 100%;
    border-radius: inherit;
    font-size: 1rem;
    background-color: transparent;
    color: var(--textColor);
    outline: none;
    border: none;
    padding-right: 15px;
  }
`

export default CountriesList;
