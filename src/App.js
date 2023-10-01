import { MovieProvider } from "./MovieContext";
import { Header } from "./Components/Header";
import { Logo } from "./Components/Logo";
import { Search } from "./Components/Search";
import { ResultCount } from "./Components/ResultCount";
import { Main } from "./Components/Main";
import { Box1 } from "./Components/Box1";
import { Box2 } from "./Components/Box2";

export default function App() {
  return (
    <MovieProvider>
      <Header>
        <Logo></Logo>
        <Search />
        <ResultCount />
      </Header>
      <Main>
        <Box1 />
        <Box2 />
      </Main>
    </MovieProvider>
  );
}
