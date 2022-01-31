import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      capital
      emoji
      emojiU
      continent {
        code
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

export const COUNTRIES_BY_CONTINENT = gql`
  query Continent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        capital
        emoji
        emojiU
        continent {
          code
          name
        }
      }
    }
  }
`;
