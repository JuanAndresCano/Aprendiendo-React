Implementación Completa CRUD

1.  Model (Entidad)
    java
    // User.java
    @Entity
    public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
        @Column(nullable = false)
        private String name;

        @Column(unique = true, nullable = false)
        private String email;

        // Getters y Setters
    }
2.  Repository (Spring Data JPA)
    java
    // UserRepository.java
    public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    }
3.  Service (Interfaz)
    java
    // UserService.java
    public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    Optional<User> findByEmail(String email);
    }
4.  Service (Implementación)
    java
    // UserServiceImpl.java
    @Service
    @Transactional
    public class UserServiceImpl implements UserService {

        private final UserRepository userRepository;

        @Autowired
        public UserServiceImpl(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        @Override
        public User createUser(User user) {
            // Validar unicidad de email
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new RuntimeException("Email ya registrado");
            }
            return userRepository.save(user);
        }

        @Override
        public Optional<User> getUserById(Long id) {
            return userRepository.findById(id);
        }

        @Override
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        @Override
        public User updateUser(Long id, User userDetails) {
            return userRepository.findById(id)
                    .map(user -> {
                        user.setName(userDetails.getName());
                        // No permitir actualizar email
                        return userRepository.save(user);
                    })
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }

        @Override
        public void deleteUser(Long id) {
            userRepository.deleteById(id);
        }

        @Override
        public Optional<User> findByEmail(String email) {
            return userRepository.findByEmail(email);
        }

    }

5.  Controller (REST)
    java
    // UserController.java
    @RestController
    @RequestMapping("/api/users")
    public class UserController {

        private final UserService userService;

        @Autowired
        public UserController(UserService userService) {
            this.userService = userService;
        }

        @PostMapping
        public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
            User newUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        }

        @GetMapping("/{id}")
        public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return userService.getUserById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @GetMapping
        public ResponseEntity<List<User>> getAllUsers() {
            return ResponseEntity.ok(userService.getAllUsers());
        }

        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser(@PathVariable Long id,
                                              @Valid @RequestBody User userDetails) {
            try {
                User updatedUser = userService.updateUser(id, userDetails);
                return ResponseEntity.ok(updatedUser);
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        }

    }
    🔄 Flujo Completo MVC
    Diagram
    Code
    Beneficios de esta Estructura
    Separación de preocupaciones:

Controller: Manejo de HTTP

Service: Lógica de negocio

Repository: Acceso a datos

Flexibilidad:

java
// Puedes cambiar implementaciones fácilmente
@Service
public class AdvancedUserServiceImpl implements UserService {
// Nueva implementación con funcionalidad extendida
}
Testabilidad:

java
// Prueba de Service sin dependencias de Controller
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void createUser_WhenEmailExists_ShouldThrowException() {
        // Configuración
        User user = new User("test@example.com", "Test User");
        when(userRepository.findByEmail("test@example.com"))
            .thenReturn(Optional.of(new User()));

        // Verificación
        assertThrows(RuntimeException.class, () -> {
            userService.createUser(user);
        });
    }

}
Mantenibilidad:

Cambios en lógica de negocio no afectan el controlador

Cambios en base de datos solo afectan el repositorio

Configuración Adicional
Inyección de Dependencias (Spring Boot 3+)
java
// Versión moderna sin @Autowired
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // Inyección por constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

}
Manejo Global de Excepciones
java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> handleDataAccessException(DataAccessException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error en base de datos");
    }

}
Ejemplo de Relación entre Entidades (User-Task)
java
// Task.java
@Entity
public class Task {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedUser;

}

// User.java
@Entity
public class User {
// ...

    @OneToMany(mappedBy = "assignedUser", cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

}

// UserService.java
public interface UserService {
// ...
List<Task> getUserTasks(Long userId);
}

// UserServiceImpl.java
@Override
public List<Task> getUserTasks(Long userId) {
return userRepository.findById(userId)
.map(User::getTasks)
.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
}
Diagrama de Clases
Diagram
Code

Esta estructura es escalable y sigue las mejores prácticas de desarrollo en Spring Boot. ¿Te gustaría que profundice en algún aspecto específico como transacciones, caché, o manejo avanzado de relaciones?
