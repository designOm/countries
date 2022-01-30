import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { Country } from "../../types/countries";
import { boxShadow } from "../styled-components";

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
  countryData: Country;
}

function CountryCard({ className, countryData, ...restProps }: Props) {
  const { name, capital, continent, emoji, emojiU, code } = countryData;
  return (
    <CountryItem className={className ?? ""} {...restProps}>
      <div className="emoji">{emoji}</div>
      <p>
        Name:{" "}
        <span>
          {name}
          {`(${code})`}
        </span>
      </p>
      <p>
        Capital: <span>{capital}</span>
      </p>
      <p>
        Continent: <span>{continent.name}</span>
      </p>
    </CountryItem>
  );
}

const CountryItem = styled.div`
margin-bottom: 25px!important;
  ${boxShadow}
  padding: 12px;
  border-radius: 5px;
  position: relative;
  padding-top: 20px;
  background-color: var(--secondery) ;
  .emoji{
    position: absolute;
    top: 0;
    left: 12px;
    transform:translateY(-50%);
    width: 35px;
    height: 35px;
    background-color: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid var(--secondery);
    ${boxShadow}
  }
  p {
    margin-bottom: 7px;
    font-size: 1.1rem;
    span {
      font-size: 0.85rem;
    }
  }
`;

export default CountryCard;
