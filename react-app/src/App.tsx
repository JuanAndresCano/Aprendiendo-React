import Card, { CardBody } from "./components/Card";
import List from "./components/List";

function App() {
  const list = ["Kayn", "Master Q", "Sett"];

  const handleSelect = (element: string) => {
    console.log(`Este es el elemento: ${element}`);
  };

  const handleSelect2 = (element: string) => {
    console.log(`Este es el elemento mrk: ${element}`);
  };
  return (
    <Card>
      <CardBody title="Hola mundo" text="Un petucheeeeee"></CardBody>
      <List data={list} onSelect={handleSelect} />
      <List data={list} onSelect={handleSelect2} />
    </Card>
  );
}

export default App;
