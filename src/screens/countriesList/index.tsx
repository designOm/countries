import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/Search_black_24dp";
import CountryCard from "../../components/countryCard";
import SelectInput from "../../components/dropdown/inde";
import { AppContainer, boxShadow, inputSurface } from "../../components/styled-components";
import { COUNTRIES_BY_CONTINENT, GET_CONTINENTS, GET_COUNTRIES } from "../../query";
import { Continent, Country } from "../../types/countries";

type CountriesData = {
  countries: Country[];
};

interface continentData extends Continent {
  countries: Country[];
}

function CountriesList() {
  const [selectedContitent, setSelectedContinent] = useState<Continent | null>(null);
  const [_data, setData] = useState<Country[] | null>(null);
  const { loading, error, data, refetch } = useQuery<CountriesData>(GET_COUNTRIES);
  const [getContinentData, { loading: Cloading, data: continentData, error: Cerror }] = useLazyQuery<{ continent: continentData }>(COUNTRIES_BY_CONTINENT, {
    variables: { code: selectedContitent?.code },
  });

  useEffect(() => {
    if (data) setData(data.countries);
  }, [data]);

  useEffect(() => {
    if (continentData) setData(continentData.continent.countries);
  }, [continentData]);

  useEffect(() => {
    if (selectedContitent !== null) {
      console.log("Fired::Get Data of a continent");
      getContinentData();
    }
  }, [selectedContitent, getContinentData]);

  const handleChnge = (option: Continent) => {
    if (option.code === "all") {
      setSelectedContinent(null);
      if (data) setData(data.countries);
    } else {
      setSelectedContinent(option);
    }
  };

  return (
    <AppContainer>
      <Utility selectedContitent={selectedContitent} onSelectContinent={handleChnge} />
      <Countries selectedContitent={selectedContitent} data={_data} loading={loading || Cloading} error={error || Cerror} />
    </AppContainer>
  );
}

//Contries Props
interface ConutriesProps {
  className?: string;
  selectedContitent?: Continent | null;
  loading: boolean;
  error?: Error;
  data: Country[] | null;
}

function Countries(props: ConutriesProps) {
  const { selectedContitent, data, loading, error } = props;

  if (loading) return <p>Loading ....</p>;
  if (error) <p style={{ color: "red" }}>Something Wrong Happens</p>;
  return <ListContainer>{data && data.map((data) => <CountryCard className="countriesItem" key={data.code} countryData={data} />)}</ListContainer>;
}

//! Utility components

interface utilityProps {
  className?: string;
  selectedContitent?: Continent | null;
  onSelectContinent: (selectedContitnent: Continent) => void;
}
const Utility = (props: utilityProps) => {
  const { selectedContitent, onSelectContinent } = props;
  const { loading, error, data } = useQuery<{ continents: Continent[] }>(GET_CONTINENTS);
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
          label={loading ? "Loading..." : selectedContitent?.name ?? "Filter by continents"}
          options={data?.continents ? [{ name: "From All", code: "all" }, ...data.continents] : []}
          renderOption={(option, onClickHandler) => (
            <li className="dropdown-child" key={option.code} onClick={(event) => onClickHandler(event, option)}>
              {option.name}
            </li>
          )}
          listWrapperComponent={"ul"}
          getSelected={(selectedOption) => onSelectContinent(selectedOption)}
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
  .searchIcon {
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
    svg {
      fill: inherit;
    }
  }
  input {
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
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  .countriesItem {
    margin: 12px auto;
    flex: 0 0 100%;
    max-width: 100%;
    &:last-child {
      margin-left: 0;
      margin-right: 0;
    }
    ${(props) => props.theme.mediaFor("bw", { range: { from: "sm", to: "md" } })} {
      flex: 0 0 calc((100% - 150px) / 2);
      max-width: calc((100% - 150px) / 2);

      &:nth-of-type(2n) {
        margin-right: 0;
      }
      &:nth-of-type(2n + 1) {
        margin-left: 0;
      }
    }
    ${(props) => props.theme.mediaFor("bw", { range: { from: "md", to: "lg" } })} {
      flex: 0 0 calc((100% - 90px) / 3);
      max-width: calc((100% - 90px) / 3);

      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &:nth-of-type(3n + 1) {
        margin-left: 0;
      }
    }
    ${(props) => props.theme.mediaFor("bw", { range: { from: "lg", to: "xxl" } })} {
      flex: 0 0 calc((100% - 100x) / 4);
      max-width: calc((100% - 100px) / 4);

      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &:nth-of-type(4n + 1) {
        margin-left: 0;
      }
    }

    ${(props) => props.theme.mediaFor("min", { for: "xxl" })} {
      flex: 0 0 calc((100% - 150px) / 5);
      max-width: calc((100% - 150px) / 5);

      &:nth-of-type(5n) {
        margin-right: 0;
      }
      &:nth-of-type(5n + 1) {
        margin-left: 0;
      }
    }
  }
`;

export default CountriesList;
