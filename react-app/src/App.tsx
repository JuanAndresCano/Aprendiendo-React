import Card, { CardBody } from "./components/Card";
import List from "./components/List";
import Button from "./components/Button";
import { useState } from "react";
/**
 * truthy
 * falsy
 */
function App() {
  const list = ["Kayn", "Master Q", "Sett", "Dr Mundo"];
  const emptyListExample: string[] = [];
  const handleSelect = (element: string) => {
    console.log(`Este es el elemento: ${element}`);
  };

  const handleSelect2 = (element: string) => {
    console.log(`Este es el elemento mrk: ${element}`);
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setIsLoading(!isLoading);
  /**
   * Renderizado condicional correcto
   */

  /** 
   * Forma 1 En esta se avisa que la lista está vacía
  const content = list.length ? (
    <List data={list} onSelect={handleSelect} />
  ) : (
    "Sin elementos para mostrar"
  );
  */

  //Forma 2 En esta no se muestra nada si la lista está vacía

  const content = list.length != 0 && (
    <List data={list} onSelect={handleSelect} />
  );

  return (
    <Card>
      {emptyListExample.length !== 0 && "My list"}
      <CardBody title="Hola mundo" text="Un petucheeeeee"></CardBody>
      {content}
      <List data={list} onSelect={handleSelect2} />
      <Button isLoading={isLoading} onClick={handleClick}>
        Hola Mundo
      </Button>
    </Card>
  );
}

export default App;

//children={<Button />}
