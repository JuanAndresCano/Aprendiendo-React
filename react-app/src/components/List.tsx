import { ReactNode, useState } from "react";
import Button from "./Button";

type Props = {
  data: string[];
  onSelect?: (element: string) => void;
  //children: ReactNode;
};

function List({ data, onSelect }: Props) {
  //useState es un hook, un state hook. Nos permite modificar variables dentro de los componentes funcionales.
  //El primer parametro es una variable que nos retorna, y la segunda es la función que nos permite la actualización.

  //Cada vez que ejecutemos esa función, React renderiza nuevamente el componente, de forma que se actualiza el coponente.
  //en el uso del useState, el primer parametro generalmente es en inglés, y el segundo es set y el nombre del parametro.
  const [index, setIndex] = useState(1);
  const handleClick = (i: number, element: string) => {
    setIndex(i);
    //Se hace esto del nombre_funcion?.(parametro), para que sólo ejecute la función las veces que está definida.
    onSelect?.(element);
  };
  return (
    <div>
      <ul className="list-group">
        {data.map((element, i) => (
          <li
            onClick={() => handleClick(i, element)}
            key={element}
            className={`list-group-item ${index == i ? "active" : ""}`}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
}

//Vamos a sacar lo del botón pues
/** 
interface ButtonProps {
  initialState?: boolean;
}
export function Button({ initialState = true }: ButtonProps) {
  const [isActive, setIsActive] = useState(initialState);

  const handleClick = () => {
    setIsActive(false);
  };
  return (
    <button
      type="button"
      className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
      onClick={handleClick}
      disabled={!isActive}
    >
      {" "}
      {isActive ? "Click" : "Tuki"}
    </button>
  );
}
  */

export default List;

//State vs props

//State:
//Datos internos
//Mutar

//Props:
//Argumentos
//Inmutables

//En común:
//Re-render
