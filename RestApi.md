Implementación de Métodos HTTP en Spring Boot (Backend)
Spring Boot facilita la creación de APIs REST con anotaciones intuitivas. Aquí un ejemplo completo:

1. Controlador REST (UserController.java)

```java
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // Simulamos una base de datos
    private final Map<Long, User> users = new HashMap<>();
    private long nextId = 1;

    // GET: Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(new ArrayList<>(users.values()), HttpStatus.OK);
    }

    // GET: Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = users.get(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        return new ResponseEntity<>(user, HttpStatus.OK); // 200
    }

    // POST: Crear nuevo usuario
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        newUser.setId(nextId++);
        users.put(newUser.getId(), newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED); // 201
    }

    // PUT: Actualizar usuario completo
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        if (!users.containsKey(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        updatedUser.setId(id);
        users.put(id, updatedUser);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK); // 200
    }

    // DELETE: Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (users.remove(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
    }

    // PATCH: Actualización parcial (ej. solo email)
    @PatchMapping("/{id}/email")
    public ResponseEntity<User> updateEmail(@PathVariable Long id, @RequestBody String newEmail) {
        User user = users.get(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setEmail(newEmail);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

// Entidad User
class User {
    private Long id;
    private String name;
    private String email;
    // getters y setters
}

```

2. Clave de Configuración (application.properties)

```java
server.port=8080
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```

Consumo desde React (Frontend)
Usaremos Axios para las peticiones HTTP:

1. Servicio API (api.js)

```javascript
import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const userService = {
  // GET Todos
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // GET por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // POST Crear
  create: async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // PUT Actualizar
  update: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // DELETE Eliminar
  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  // PATCH Actualizar email
  updateEmail: async (id, newEmail) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}/email`,
        `"${newEmail}"`, // Envía como string JSON
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating email for ${id}:`, error);
      throw error;
    }
  },
};
```

2. Componente React (UserComponent.jsx)

```javascript
import React, { useState, useEffect } from "react";
import { userService } from "./api";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // GET al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // POST al enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await userService.create(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      alert("Error creating user!");
    }
  };

  // DELETE al hacer clic en botón
  const handleDelete = async (id) => {
    try {
      await userService.delete(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Error deleting user!");
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
```

Buenas Prácticas

1. Validación (Backend):

```java
@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody User newUser) {
  // Spring Validation activada con @Valid
}
```

2. Manejo de Errores (Frontend):

```javascript
try {
  await userService.update(1, data);
} catch (error) {
  if (error.response?.status === 404) {
    alert("Usuario no encontrado");
  }
}
```

3. Seguridad (Backend):

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/api/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/**").authenticated()
            .and()
            .httpBasic();
    }
}
```

🔐 Autenticación JWT (JSON Web Tokens)
Los JWT son tokens compactos que permiten transmitir información de autenticación entre cliente y servidor de forma segura. Constan de tres partes: Header.Payload.Signature.

Flujo de Autenticación JWT:

Implementación en Spring Boot:

1. Dependencias (pom.xml)

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

2. Utilidad JWT (JwtUtil.java)

```java
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

3. Filtro de Seguridad (JwtAuthFilter.java)

```java
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException {

        String token = extractToken(request);

        if (token != null && jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);
            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
```

4. Configuración de Seguridad (SecurityConfig.java)

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/auth/login").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

5. Controlador de Autenticación (AuthController.java)

```java
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

// DTOs
record LoginRequest(String username, String password) {}
record LoginResponse(String token) {}
```

Consumo desde React:

```javascript
// api.js
export const authService = {
  login: async (credentials) => {
    const response = await axios.post("/auth/login", credentials);
    return response.data.token;
  },
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("jwtToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwtToken");
    }
  },
};

// App.js
useEffect(() => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    authService.setAuthToken(token);
  }
}, []);

const handleLogin = async (credentials) => {
  try {
    const token = await authService.login(credentials);
    authService.setAuthToken(token);
  } catch (error) {
    // Manejar error
  }
};
```

📖 Paginación en Spring Boot y React
Backend: Paginación con Spring Data

1. Repositorio (UserRepository.java)

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAll(Pageable pageable);
    Page<User> findByNameContaining(String name, Pageable pageable);
}
```

2. Controlador (UserController.java)

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        Page<User> result;

        if (name != null) {
            result = userRepository.findByNameContaining(name, pageable);
        } else {
            result = userRepository.findAll(pageable);
        }

        return ResponseEntity.ok(result);
    }
}
```

Estructura de respuesta:

```json
{
  "content": [
    { "id": 1, "name": "Ana" },
    { "id": 2, "name": "Carlos" }
  ],
  "pageable": {
    "sort": { "sorted": true, "unsorted": false },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true
  },
  "totalPages": 3,
  "totalElements": 25,
  "last": false,
  "first": true,
  "numberOfElements": 10,
  "size": 10,
  "number": 0,
  "sort": { "sorted": true, "unsorted": false }
}
```

Frontend: Consumo con React

1. Servicio (api.js)

```javascript
export const userService = {
  getPaginatedUsers: async (page, size, search) => {
    const params = {
      page,
      size,
    };

    if (search) {
      params.name = search;
    }

    const response = await axios.get("/api/users", { params });
    return response.data;
  },
};
```

2. Componente con Paginación (UserList.jsx)

```javascript
function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, search]);

  const fetchUsers = async (page) => {
    const data = await userService.getPaginatedUsers(page, pageSize, search);
    setUsers(data.content);
    setTotalPages(data.totalPages);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Resetear a primera página
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={search}
        onChange={handleSearch}
      />

      <table>
        <thead>...</thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>{/* ... */}</tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </button>

        <span>
          Página {currentPage + 1} de {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
```

Mejoras Avanzadas:
Componente de Paginación Reutilizable:

```javascript
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
}
```

```java

```
