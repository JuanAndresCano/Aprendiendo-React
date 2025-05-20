# Nivelación JavaScript para React

### 1. **Sintaxis Básica de JavaScript (vs. Java/Python)**
JavaScript tiene similitudes con Java y Python, pero con diferencias clave, pues js es un lenguaje de tipado dinámico:

#### Variables:
- `let`: Variable que puede cambiar (como `int x = 5` en Java).
- `const`: Constante (no puede reasignarse).

```javascript
let edad = 25; // Variable mutable
const PI = 3.1416; // Constante
```

- Ventaja: Flexibilidad para reasignar tipos:

```javascript
let valor = "Hola"; // String
valor = 42;         // Ahora es number (válido)
```
- Desventaja: Mayor riesgo de errores (por eso se usa TypeScript en proyectos grandes).

#### Trabajo con Strings.

JavaScript tiene template literals (similares a los f-strings de Python), usando backticks (`):

```javascript
const nombre = "Ana";
const saludo = `Hola, ${nombre}. 
Tienes ${25 + 5} años.`; // Multilínea e interpolación
```
- Interpolación: Insertar variables con `${}`. 

- **Métodos útiles:**

```javascript
"React".startsWith("R");    // true
"JavaScript".includes("va");// true
"  texto  ".trim();         // "texto"
```

#### Arreglos:

JavaScript tiene métodos similares a los de Python:

```javascript
const numeros = [1, 2, 3];

// Métodos comunes:
numeros.map((num) => num * 2);    // [2, 4, 6] (como list comprehensions)
numeros.filter((num) => num > 1); // [2, 3]
numeros.find((num) => num === 2); // 2

// Operador spread (copiar/mezclar arrays):
const nuevosNumeros = [...numeros, 4, 5]; // [1, 2, 3, 4, 5]

// Desestructuración:
const [primero, segundo] = numeros;
console.log(primero); // 1


const numeros = [1, 2, 3, 4];

// Desestructuración básica
const [primero, segundo] = numeros;
console.log(primero); // 1
console.log(segundo); // 2

// Para obtener "head" y "tail" (como en Scala):
const [head, ...tail] = numeros;
console.log(head); // 1
console.log(tail); // [2, 3, 4]
```

- `...tail` usa el **operador** rest para capturar los elementos restantes en un nuevo array.
---

### 2. **Funciones Flecha (Fat Arrow Functions)**
Son una forma corta de escribir funciones en JavaScript. Se usan mucho en React.

#### Ejemplo vs. Python/Java:
- **JavaScript (Arrow Function):**
  ```javascript
  const sumar = (a, b) => a + b;
  ```
- Equivalente en Python: `sumar = lambda a, b: a + b`

#### Características:
- **`this` léxico**: No crea su propio `this` (a diferencia de funciones normales).
- **Implícito**: Si es una línea, el `return` es automático.

```javascript
// Función normal
function duplicar(x) {
  return x * 2;
}

// Arrow function equivalente
const duplicar = x => x * 2;
```

#### Sintaxis Multilinea:

- Usar `{}` y return explícito:

```javascript
const sumarYDuplicar = (a, b) => {
  const suma = a + b;
  return suma * 2;
};
```


#### Beneficios en React:

- Menos código: Ideales para funciones cortas (manejadores de eventos).

- `this` léxico: Capturan el `this` del contexto exterior (evitan errores comunes en clases).

```javascript
// Ejemplo en React (sin arrow function):
class Componente extends React.Component {
  constructor() {
    super();
    this.state = { contador: 0 };
    // Necesario bindear manualmente:
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ contador: this.state.contador + 1 });
  }
}

// Con arrow function (no necesita bind):
class Componente extends React.Component {
  handleClick = () => {
    this.setState({ contador: this.state.contador + 1 });
  };
}
```
---

### 3. **Clases en JavaScript**
Similar a Java, pero con diferencias en herencia y sintaxis.

#### Definición:
```javascript
class Persona {
  constructor(nombre) {
    this._nombre = nombre; // Convención: _ para propiedades "privadas"
  }

  get nombre() {
    return this._nombre.toUpperCase();
  }

  set nombre(nuevoNombre) {
    this._nombre = nuevoNombre.trim();
  }
}

const juan = new Persona(" Juan ");
console.log(juan.nombre); // "JUAN" (usa el getter)
juan.nombre = "  Ana  ";   // Setter elimina espacios
console.log(juan.nombre); // "ANA"
```


#### Herencia:
```javascript
class Estudiante extends Persona {
  constructor(nombre, edad, curso) {
    super(nombre, edad); // Llama al constructor de Persona
    this.curso = curso;
  }

  estudiar() {
    console.log(`${this.nombre} estudia ${this.curso}`);
  }
}

const ana = new Estudiante("Ana", 22, "React");
ana.estudiar(); // "Ana estudia React"
```
 Al igual que Java, JS no soporta herenca múltiple. Sin embargo, se puede usar **herencia prototipal** (Los objetos heredan de otrros objetos).

 - Alternativa: Usar mixins (patrón de diseño) para simular herencia múltiple:

 ```javascript
const habilidadesMixins = {
  programar() {
    console.log("Programando...");
  },
};

class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

Object.assign(Persona.prototype, habilidadesMixins); // Añadir mixin

const juan = new Persona("Juan");
juan.programar(); // "Programando..."
```

#### Interfaces:

JavaScript no tiene interfaces nativas (como Java o TypeScript), pero puedes simularlas con validaciones manuales o usar TypeScript (recomendado en proyectos grandes).
---

### 4. **Alcance (Scope)**
JavaScript tiene **scope léxico**: las variables existen dentro del bloque donde se definen (`{}`).

#### Ejemplo:
```javascript
let x = 10; // Variable global

function ejemploScope() {
  let x = 20; // Variable local
  if (true) {
    let x = 30; // Variable dentro del bloque if
    console.log(x); // 30
  }
  console.log(x); // 20
}

console.log(x); // 10
```

- **`var` vs `let`**: `var` tiene scope de función (no de bloque), por eso se prefiere `let`/`const`.

#### Profundización:

`var` es la forma antigua de declarar variables en JavaScript. Diferencias clave con `let`/`const`:

- Scope de función (no de bloqueo):

```javascript
if (true) {
  var x = 10;
}
console.log(x); // 10 (¡var es accesible fuera del bloque!)
```
- Hoisting: Las variables `var` se "elevan" al inicio de la función (se declaran, pero no se inicializan):

```javascript
console.log(y); // undefined (no da error)
var y = 5;
```
- Razón para usar let/const:
`let`/`const` evitan estos comportamientos, limitando el scope al bloque y previniendo errores.


---

### 5. **Fetch API (Para peticiones HTTP)**
Es el método moderno para hacer llamadas a APIs en JavaScript. Retorna una **promesa** (similar a `Future` en Java o corrutinas en Python).

#### Ejemplo Básico:
```javascript
fetch("https://api.example.com/data")
  .then(response => response.json()) // Convierte la respuesta a JSON
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

#### Con Async/Await (Más legible):
```javascript
async function obtenerDatos() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

---

### 6. **React y JavaScript Moderno**
- **Componentes Funcionales**: En React moderno se usan funciones con **Hooks** (no clases).
- **Arrow Functions + Fetch**:
  ```javascript
  import { useEffect } from "react";

  function MiComponente() {
    useEffect(() => {
      const obtenerDatos = async () => {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
      };
      obtenerDatos();
    }, []);

    return <div>Hola React</div>;
  }
  ```

---

### Próximos Pasos:
- Practica creando funciones y clases en JavaScript.
- Juega con el Fetch API en [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

