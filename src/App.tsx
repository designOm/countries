import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AppRoutes from "./App.routes";
import { ActiveThemeProvider } from "./components/activeThemeProvider";
import GlobalStyleSheet from "./global.styles";
import { defaultTheme } from "./theme";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

// const theme:DefaultTheme = new Theme();

function App() {
  return (
    <ApolloProvider client={client}>
      <ActiveThemeProvider theme={defaultTheme}>
        <AppRoutes />
        <GlobalStyleSheet />
      </ActiveThemeProvider>
    </ApolloProvider>
  );
}

export default App;
