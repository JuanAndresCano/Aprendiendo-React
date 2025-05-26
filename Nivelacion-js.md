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
valor = 42; // Ahora es number (válido)
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
"React".startsWith("R"); // true
"JavaScript".includes("va"); // true
"  texto  ".trim(); // "texto"
```

#### Arreglos:

JavaScript tiene métodos similares a los de Python:

```javascript
const numeros = [1, 2, 3];

// Métodos comunes:
numeros.map((num) => num * 2); // [2, 4, 6] (como list comprehensions)
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

#### **1. Bucles (`for`, `while`, `for...of`)**

##### a. Bucle `for` (como en Java):

```javascript
// Imprimir números del 0 al 4
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

##### b. Bucle `for...of` (para iterar arrays):

```javascript
const frutas = ["manzana", "banana", "uva"];

// Equivalente a Python: for fruta in frutas:
for (const fruta of frutas) {
  console.log(fruta); // "manzana", "banana", "uva"
}
```

##### c. Método `forEach` (para arrays):

```javascript
frutas.forEach((fruta, indice) => {
  console.log(`Índice ${indice}: ${fruta}`);
});
// Salida:
// Índice 0: manzana
// Índice 1: banana
// Índice 2: uva
```

---

### **2. Arreglos Dinámicos**

En JavaScript, los arrays son **dinámicos por defecto** (no tienen tamaño fijo, como en Python). Operaciones comunes:

##### a. Añadir elementos:

```javascript
const numeros = [1, 2, 3];

// Al final (como append en Python)
numeros.push(4); // [1, 2, 3, 4]

// Al inicio
numeros.unshift(0); // [0, 1, 2, 3, 4]

// En posición específica (splice)
numeros.splice(2, 0, 1.5); // [0, 1, 1.5, 2, 3, 4]
// splice(indice, elementos_a_eliminar, elementos_a_añadir)
```

##### b. Eliminar elementos:

```javascript
// Desde el final (como pop en Python)
numeros.pop(); // [0, 1, 1.5, 2, 3]

// Desde el inicio
numeros.shift(); // [1, 1.5, 2, 3]

// Desde posición específica
numeros.splice(1, 1); // Elimina 1 elemento en índice 1 → [1, 2, 3]
```

##### c. Crear arrays dinámicos:

```javascript
// Array vacío
const tareas = [];

// Añadir elementos dinámicamente
tareas.push("Estudiar JS");
tareas.push("Hacer ejercicio");

console.log(tareas); // ["Estudiar JS", "Hacer ejercicio"]
```

---

#### **3. Métodos Útiles para Arrays**

JavaScript tiene métodos similares a los de Python para manipular arrays:

| Método     | Descripción                                 | Ejemplo                                  |
| ---------- | ------------------------------------------- | ---------------------------------------- |
| `map()`    | Crea un nuevo array transformando elementos | `numeros.map(n => n * 2)`                |
| `filter()` | Filtra elementos según condición            | `numeros.filter(n => n > 2)`             |
| `reduce()` | Reduce el array a un único valor            | `numeros.reduce((acc, n) => acc + n, 0)` |
| `slice()`  | Copia una porción del array                 | `numeros.slice(1, 3)`                    |
| `concat()` | Combina arrays                              | `numeros.concat([4, 5])`                 |

**Ejemplo avanzado con `map` + `filter`:**

```javascript
const numeros = [1, 2, 3, 4, 5];

const paresDuplicados = numeros
  .filter((n) => n % 2 === 0) // [2, 4]
  .map((n) => n * 2); // [4, 8]

console.log(paresDuplicados); // [4, 8]
```

---

#### **4. Spread Operator (`...`) para Arrays**

Útil para crear copias o mezclar arrays:

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5];

// Copiar un array
const copia = [...arr1]; // [1, 2, 3]

// Mezclar arrays
const mezcla = [...arr1, ...arr2]; // [1, 2, 3, 4, 5]

// Añadir elemento
const nuevoArr = [...arr1, 4]; // [1, 2, 3, 4]
```

---

#### **5. React y Arrays Dinámicos**

En React, es común usar `map` para renderizar listas dinámicas:

```javascript
function ListaTareas() {
  const tareas = ["Estudiar JS", "Hacer ejercicio", "Leer"];

  return (
    <ul>
      {tareas.map((tarea, indice) => (
        <li key={indice}>{tarea}</li>
      ))}
    </ul>
  );
}
```

---

#### **Resumen**

- **Bucles**: Usa `for`, `for...of`, o métodos como `forEach`.
- **Arrays dinámicos**: Manipula con `push`, `pop`, `splice`, etc.
- **Métodos funcionales**: `map`, `filter`, `reduce` (clave en React).
- **Spread operator**: Para copiar o combinar arrays.

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
const duplicar = (x) => x * 2;
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
juan.nombre = "  Ana  "; // Setter elimina espacios
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

## JavaScript no tiene interfaces nativas (como Java o TypeScript), pero puedes simularlas con validaciones manuales o usar TypeScript (recomendado en proyectos grandes).

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
  .then((response) => response.json()) // Convierte la respuesta a JSON
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
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

#### Promesas (vs. Futures en Java y corrutinas en Python)

#### **a. ¿Qué es una promesa?**

Es un objeto que representa un valor que puede estar disponible ahora, en el futuro, o nunca. Se usa para operaciones asíncronas.

#### **b. Estados de una promesa:**

- **Pending:** En ejecución.
- **Fulfilled:** Operación exitosa.
- **Rejected:** Operación fallida.

#### **c. Ejemplo con `fetch`:**

```javascript
const promesa = fetch("https://api.example.com/data");

promesa
  .then((response) => response.json()) // Éxito
  .then((data) => console.log(data))
  .catch((error) => console.error(error)); // Fallo
```

#### **d. Comparación con Java/Python:**

- Java (Future): Similar, pero con métodos como `.get()` (bloqueante).

- Python (corrutinas): `Usan async/await` (similar a JS), pero en Python se manejan con `asyncio`.

#### Teoría de `async/await`

#### **a. ¿Qué es?**

Es azúcar sintáctico sobre las promesas, haciendo el código asíncrono más legible (como si fuera síncrono).

#### **b. Ejemplo:**

```javascript
async function obtenerDatos() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

#### **c. Reglas clave:**

- `await` solo funciona dentro de funciones `async`.

- Una función `async` siempre retorna una promesa.

#### ¿Qué es `useEffect` y cuándo se ponen ";"?

#### **a. `useEffect` en React:**

Es un Hook que maneja efectos secundarios en componentes funcionales (como peticiones HTTP, suscripciones, etc.).

**Ejemplo:**

```javascript
import { useEffect } from "react";

function MiComponente() {
  useEffect(() => {
    // Código que se ejecuta después del renderizado
    fetchData();
    return () => {
      // Cleanup (como desuscribirse de eventos)
    };
  }, []); // Array de dependencias (vacío = se ejecuta una vez)
}
```

#### **b. ¿Cuándo usar ";"?**

En JavaScript, los `;` son opcionales, pero se recomiendan en ciertos casos:

- Evitar errores en líneas que empiezan con `[` o `(`.

- Ejemplo problemático sin `;`:

```javascript
const x = (5)[(1, 2, 3)].map((n) => n * 2); // Error: Se interpreta como 5[1, 2, 3]...
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

### Nuevos Operadores Aprendidos:

#### 1. `!!` Doble negación:

```typescript
let user = null;
console.log(!!user); // false

user = { name: "John" };
console.log(!!user); // true
```

#### 2. `?.` Optional Chaining:

```typescript
let user = null;
console.log(user?.name); // undefined (sin error)

user = { name: "John" };
console.log(user?.name); // "John"
```

#### 3. `?` Operador ternario:

```typescript
// condición ? valor si verdadero : valor si falso
const edad = 20;
const mensaje = edad >= 18 ? "Adulto" : "Menor";
```
