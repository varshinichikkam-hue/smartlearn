import { User, TellerChannel, Resource } from "@/types";

export const POPULAR_SUBJECTS = [
  {
    name: "Programming",
    slug: "programming",
    description: "Core languages, memory management, paradigms & clean code design.",
    iconName: "Code2",
    count: 148,
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Data Structures",
    slug: "data-structures",
    description: "Trees, graphs, dynamic programming, sorting & asymptotic complexity.",
    iconName: "Binary",
    count: 182,
    color: "from-indigo-600 to-purple-600",
  },
  {
    name: "DBMS",
    slug: "dbms",
    description: "Relational models, SQL query optimization, indexing & ACID transactions.",
    iconName: "Database",
    count: 114,
    color: "from-purple-600 to-pink-600",
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    description: "Discrete math, linear algebra, calculus, proofs & probability theory.",
    iconName: "Sigma",
    count: 135,
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "Electronics",
    slug: "electronics",
    description: "Digital logic, microcontrollers, embedded C, and circuit fundamentals.",
    iconName: "Cpu",
    count: 96,
    color: "from-violet-600 to-indigo-600",
  },
  {
    name: "Web Development",
    slug: "web-development",
    description: "Frontend architecture, APIs, modern responsive CSS, and backend servers.",
    iconName: "Globe",
    count: 164,
    color: "from-cyan-600 to-blue-600",
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: "user-teller-1",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@campus.edu",
    role: "teller",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    university: "National Institute of Technology",
    bio: "Senior TA & CS graduate student. Passionate about deconstructing algorithmic problems and helping peers excel in technical interviews.",
    joinedAt: "2024-08-15",
  },
  {
    id: "user-teller-2",
    name: "Marcus Thorne",
    email: "marcus.t@univ.edu",
    role: "teller",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    university: "Berkeley College of Computing",
    bio: "3rd-year Software Engineering student. Building full-stack web platforms and sharing battle-tested architecture summaries.",
    joinedAt: "2024-09-02",
  },
  {
    id: "user-teller-3",
    name: "Elena Rostova",
    email: "elena.r@polytech.edu",
    role: "teller",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    university: "State Technical University",
    bio: "Applied Mathematics researcher & tutor. Specializing in discrete proofs, linear algebra and optimization problems.",
    joinedAt: "2024-10-12",
  },
  {
    id: "user-teller-4",
    name: "Arjun Mehta",
    email: "arjun.m@engg.edu",
    role: "teller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    university: "Institute of Electronics & Tech",
    bio: "Robotics club lead & hardware enthusiast. Demystifying digital logic gates, ARM microcontrollers, and circuit analysis.",
    joinedAt: "2024-11-05",
  },
  {
    id: "user-learner-1",
    name: "Jordan Lee",
    email: "jordan.lee@student.edu",
    role: "learner",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80",
    university: "Metropolitan State University",
    bio: "Sophomore CS student preparing for semester exams and learning systems programming.",
    joinedAt: "2025-01-10",
  },
];

export const INITIAL_CHANNELS: TellerChannel[] = [
  {
    id: "channel-1",
    userId: "user-teller-1",
    name: "Algorithm Hub & Data Structures",
    handle: "@priyacodes",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    bio: "Clear, zero-fluff explanations of core data structures, graph traversals, and dynamic programming patterns tested in university midterms.",
    university: "National Institute of Technology",
    subjects: ["Data Structures", "Programming"],
    followerCount: 1420,
    totalViews: 28450,
    resourceCount: 8,
  },
  {
    id: "channel-2",
    userId: "user-teller-2",
    name: "Modern Web Engineering",
    handle: "@marcus_dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    bio: "Hands-on web development notes, database normalization breakdowns, and clean frontend UI architectural patterns.",
    university: "Berkeley College of Computing",
    subjects: ["Web Development", "DBMS"],
    followerCount: 980,
    totalViews: 19800,
    resourceCount: 6,
  },
  {
    id: "channel-3",
    userId: "user-teller-3",
    name: "Pure & Applied Mathematics",
    handle: "@elena_math",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    bio: "Intuitive breakdowns of university mathematics: Linear Algebra, Calculus III, Differential Equations, and Discrete Proofs.",
    university: "State Technical University",
    subjects: ["Mathematics"],
    followerCount: 1150,
    totalViews: 22100,
    resourceCount: 5,
  },
  {
    id: "channel-4",
    userId: "user-teller-4",
    name: "Silicon & Embedded Systems",
    handle: "@arjun_circuits",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    bio: "Hardware engineering notes covering digital logic, logic gates, Karnaugh maps, and hands-on microcontroller wiring guides.",
    university: "Institute of Electronics & Tech",
    subjects: ["Electronics", "Programming"],
    followerCount: 840,
    totalViews: 15400,
    resourceCount: 4,
  },
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: "res-1",
    channelId: "channel-1",
    tellerId: "user-teller-1",
    tellerName: "Dr. Priya Sharma",
    tellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    title: "Comprehensive DSA Handwritten Cheat Sheet: Trees, Graphs & DP",
    description: "A 46-page structured guide reviewing binary search trees, AVL rotations, graph BFS/DFS traversal templates, and top 10 dynamic programming patterns with time-complexity proofs.",
    subject: "Data Structures",
    topic: "Graphs & Dynamic Programming",
    type: "pdf",
    fileName: "DSA_Master_CheatSheet_Trees_Graphs_DP.pdf",
    fileSize: "6.4 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 4820,
    favouritesCount: 512,
    pageCount: 46,
    createdAt: "2025-02-10T14:30:00Z",
    contentPreview: `
### SECTION 1: TREE STRUCTURES & BALANCING
- Binary Search Tree invariants: for any node N, all keys in left subtree < N.key, all in right > N.key.
- In-order traversal yields sorted sequence in O(N).
- AVL Rotations: Left-Left (Single Right Rotation), Right-Right (Single Left Rotation), Left-Right (Double Rotation: Left then Right), Right-Left.

### SECTION 2: GRAPH ALGORITHMS
- Representation: Adjacency List (space O(V+E)) vs Adjacency Matrix (space O(V^2)).
- BFS using Queue: guarantees shortest path in unweighted graphs. Time: O(V + E).
- DFS using Recursion / Stack: cycle detection, topological sorting on DAGs.
- Dijkstra's Algorithm with Min-Heap Priority Queue: O((V + E) log V).

### SECTION 3: DYNAMIC PROGRAMMING FORMULATIONS
- 0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])
- Longest Common Subsequence (LCS): match -> 1 + dp[i-1][j-1], mismatch -> max(dp[i-1][j], dp[i][j-1])
- Coin Change (Minimum Coins): dp[a] = min(dp[a], 1 + dp[a - c])
    `,
  },
  {
    id: "res-2",
    channelId: "channel-1",
    tellerId: "user-teller-1",
    tellerName: "Dr. Priya Sharma",
    tellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    title: "Mastering Graph Traversal: BFS, DFS & Dijkstra Step-by-Step",
    description: "Visual walkthrough and live code demonstration of breadth-first search and shortest-path calculation with priority queues on unweighted and weighted graphs.",
    subject: "Data Structures",
    topic: "Shortest Path Algorithms",
    type: "video",
    fileName: "Graph_Traversal_BFS_DFS_Dijkstra_Explained.mp4",
    fileSize: "148 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "22:15",
    views: 3950,
    favouritesCount: 421,
    createdAt: "2025-02-14T09:15:00Z",
  },
  {
    id: "res-3",
    channelId: "channel-2",
    tellerId: "user-teller-2",
    tellerName: "Marcus Thorne",
    tellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "Relational Database Design & Normalization (1NF to BCNF) with Examples",
    description: "Step-by-step student notes breaking down functional dependencies, Armstrong's axioms, anomaly elimination, and schema decomposition into Boyce-Codd Normal Form.",
    subject: "DBMS",
    topic: "Normalization & Schema Design",
    type: "pdf",
    fileName: "Database_Normalization_1NF_to_BCNF_Guide.pdf",
    fileSize: "4.8 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 2980,
    favouritesCount: 310,
    pageCount: 32,
    createdAt: "2025-02-18T11:00:00Z",
    contentPreview: `
### MODULE 1: ANOMALIES IN UNNORMALIZED SCHEMAS
- Insertion Anomaly: Cannot record an entity without adding unrelated data.
- Deletion Anomaly: Removing one record causes unintended loss of critical secondary data.
- Update Anomaly: Duplicate values require updates across multiple rows, leading to data inconsistency.

### MODULE 2: NORMAL FORMS HIERARCHY
1. First Normal Form (1NF): All attributes must contain atomic (indivisible) values. No repeating groups.
2. Second Normal Form (2NF): Must be in 1NF, and every non-prime attribute must be fully functionally dependent on candidate key (no partial dependencies).
3. Third Normal Form (3NF): Must be in 2NF, and no non-prime attribute is transitively dependent on candidate key (if X -> A, either X is superkey or A is prime).
4. Boyce-Codd Normal Form (BCNF): For every non-trivial functional dependency X -> Y, X must be a superkey.
    `,
  },
  {
    id: "res-4",
    channelId: "channel-2",
    tellerId: "user-teller-2",
    tellerName: "Marcus Thorne",
    tellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "SQL Query Optimization & B-Tree Indexing Strategies Deep Dive",
    description: "Learn how query planners execute EXPLAIN plans, when clustered vs non-clustered indexes fire, and how to eliminate slow table scans in PostgreSQL and MySQL.",
    subject: "DBMS",
    topic: "Query Optimization & Indexing",
    type: "video",
    fileName: "SQL_Optimization_and_Indexes_Lecture.mp4",
    fileSize: "162 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "18:40",
    views: 2540,
    favouritesCount: 289,
    createdAt: "2025-02-22T16:20:00Z",
  },
  {
    id: "res-5",
    channelId: "channel-3",
    tellerId: "user-teller-3",
    tellerName: "Elena Rostova",
    tellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    title: "Linear Algebra: Eigenvalues, Vector Spaces & Matrix Transformations",
    description: "Visual proofs and worked problem sets for vector subspaces, Gram-Schmidt orthogonalization, characteristic polynomials, and diagonalizing matrices.",
    subject: "Mathematics",
    topic: "Vector Spaces & Eigenvectors",
    type: "pdf",
    fileName: "Linear_Algebra_Eigenvalues_Vector_Spaces.pdf",
    fileSize: "5.2 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 3120,
    favouritesCount: 345,
    pageCount: 38,
    createdAt: "2025-02-25T13:40:00Z",
    contentPreview: `
### 1. VECTOR SPACES AND SUBSPACES
- Closure under vector addition: u + v in V.
- Closure under scalar multiplication: c * u in V.
- Basis: A set of linearly independent vectors spanning the entire space.
- Dimension: The number of vectors in any basis of V. Rank-Nullity Theorem: rank(A) + nullity(A) = n.

### 2. EIGENVALUES AND EIGENVECTORS
- Definition: A * v = λ * v where v != 0 and λ is the eigenvalue scalar.
- Characteristic Equation: det(A - λ * I) = 0.
- Geometric multiplicity <= Algebraic multiplicity for each distinct eigenvalue.
- Symmetric matrices have real eigenvalues and orthogonal eigenvectors.
    `,
  },
  {
    id: "res-6",
    channelId: "channel-3",
    tellerId: "user-teller-3",
    tellerName: "Elena Rostova",
    tellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    title: "Multivariable Calculus: Gradient Descent & Directional Derivatives",
    description: "Intuitive geometric breakdown of partial derivatives, Jacobian matrices, directional gradients, and contour plots used in engineering and machine learning models.",
    subject: "Mathematics",
    topic: "Multivariable Calculus",
    type: "video",
    fileName: "Multivariable_Calculus_Gradients.mp4",
    fileSize: "135 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "21:05",
    views: 2890,
    favouritesCount: 301,
    createdAt: "2025-02-28T10:00:00Z",
  },
  {
    id: "res-7",
    channelId: "channel-4",
    tellerId: "user-teller-4",
    tellerName: "Arjun Mehta",
    tellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    title: "Digital Logic & Circuit Design: Karnaugh Maps & Sequential Circuits",
    description: "Complete study summary on Boolean algebra simplification, 4-variable K-maps, JK and D flip-flops, synchronous counter design, and finite state machines.",
    subject: "Electronics",
    topic: "Boolean Algebra & Sequential Circuits",
    type: "pdf",
    fileName: "Digital_Logic_Circuits_KMap_FlipFlops.pdf",
    fileSize: "7.1 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 2430,
    favouritesCount: 260,
    pageCount: 35,
    createdAt: "2025-03-02T15:10:00Z",
    contentPreview: `
### CHAPTER 1: BOOLEAN ALGEBRA & GATE MINIMIZATION
- De Morgan's Laws: (A + B)' = A' * B' and (A * B)' = A' + B'
- K-Map grouping rules: groups of 2^k adjacent 1s. Wrap-around adjacency across edges.
- Don't-care conditions (X) can be included to enlarge groups and reduce gate count.

### CHAPTER 2: SEQUENTIAL LOGIC & FLIP-FLOPS
- SR Latch: invalid state when S=1, R=1.
- D Flip-Flop: output Q follows input D at clock edge. Characteristic equation: Q(next) = D.
- JK Flip-Flop: eliminates invalid state; J=1, K=1 causes toggle. Q(next) = J*Q' + K'*Q.
- T Flip-Flop: toggles on T=1. Q(next) = T ⊕ Q.
    `,
  },
  {
    id: "res-8",
    channelId: "channel-4",
    tellerId: "user-teller-4",
    tellerName: "Arjun Mehta",
    tellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    title: "Microcontrollers 101: GPIO Pins, Timers & Hardware Interrupts",
    description: "Lab demonstration connecting sensors, setting up timer prescalers, writing interrupt service routines (ISRs), and debouncing mechanical pushbuttons.",
    subject: "Electronics",
    topic: "Embedded Systems & Microcontrollers",
    type: "video",
    fileName: "Microcontrollers_GPIO_Interrupts_Demo.mp4",
    fileSize: "180 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "24:15",
    views: 2190,
    favouritesCount: 234,
    createdAt: "2025-03-05T08:30:00Z",
  },
  {
    id: "res-9",
    channelId: "channel-1",
    tellerId: "user-teller-1",
    tellerName: "Dr. Priya Sharma",
    tellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    title: "Python for Engineers: OOP, Memory Management & Performance",
    description: "In-depth guide to Python object model, dunder methods, generator pipelines, reference counting, garbage collection cyclic detector, and Cython profiling.",
    subject: "Programming",
    topic: "Advanced Python & Memory Model",
    type: "pdf",
    fileName: "Python_for_Engineers_OOP_Memory.pdf",
    fileSize: "5.8 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 3740,
    favouritesCount: 390,
    pageCount: 40,
    createdAt: "2025-03-08T12:00:00Z",
    contentPreview: `
### 1. OBJECT-ORIENTED PYTHON INTERNALS
- Everything is an object: classes, functions, modules are first-class citizen instances of 'type'.
- Dunder methods: __init__, __new__, __repr__, __call__, __enter__ / __exit__ context managers.
- Multiple inheritance and Method Resolution Order (MRO) using C3 Superclass Linearization.

### 2. MEMORY AND GARBAGE COLLECTION
- PyObject header: ob_refcnt (reference count) and ob_type.
- Generational GC: Generation 0, 1, 2 to detect and collect circular reference islands.
- Memory optimization: __slots__ eliminates __dict__ per-instance overhead, cutting memory consumption up to 60%.
    `,
  },
  {
    id: "res-10",
    channelId: "channel-2",
    tellerId: "user-teller-2",
    tellerName: "Marcus Thorne",
    tellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "Full-Stack System Architecture: REST, GraphQL, Caching & Auth",
    description: "Architecture blueprints covering JWT vs session cookies, HTTP caching headers (ETag, Cache-Control), rate limiting with Redis, and resilient microservice design.",
    subject: "Web Development",
    topic: "System Architecture & API Design",
    type: "pdf",
    fileName: "FullStack_System_Architecture_Guide.pdf",
    fileSize: "6.1 MB",
    thumbnailUrl: "/images/notes_study_desk_1791559417026.jpg",
    views: 3380,
    favouritesCount: 360,
    pageCount: 42,
    createdAt: "2025-03-12T14:15:00Z",
    contentPreview: `
### CHAPTER 1: AUTHENTICATION & SESSION LIFECYCLE
- Stateless JWT: Claims encoded in base64url, signed with HMAC-SHA256 or RSA.
- Security best practice: Store access tokens in memory or short-lived cookies; HttpOnly + SameSite=Strict refresh cookies.
- Revocation strategy: Redis token blacklist or incrementing user token_version schema column.

### CHAPTER 2: HIGH-PERFORMANCE CACHING
- Browser Cache: Cache-Control: max-age=31536000, immutable for hashed assets.
- Reverse Proxy Caching: Stale-While-Revalidate pattern for dynamic APIs.
- Cache invalidation: Cache-Aside pattern with TTL and proactive write-through updates.
    `,
  },
  {
    id: "res-11",
    channelId: "channel-2",
    tellerId: "user-teller-2",
    tellerName: "Marcus Thorne",
    tellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "CSS Grid & Flexbox Masterclass with Practical Responsive Layouts",
    description: "Hands-on video breaking down CSS grid template areas, minmax, auto-fit vs auto-fill, flex-grow math, and creating production-grade responsive dashboards.",
    subject: "Web Development",
    topic: "Modern CSS Layouts",
    type: "video",
    fileName: "CSS_Grid_and_Flexbox_Masterclass.mp4",
    fileSize: "155 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    duration: "19:50",
    views: 2950,
    favouritesCount: 318,
    createdAt: "2025-03-15T11:45:00Z",
  },
  {
    id: "res-12",
    channelId: "channel-1",
    tellerId: "user-teller-1",
    tellerName: "Dr. Priya Sharma",
    tellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    title: "Rust vs C++: Pointers, Borrow Checker & Concurrency Explained",
    description: "Deep dive into systems programming comparisons: RAII, smart pointers (std::unique_ptr vs Box), lifetimes, data-race prevention, and memory safety without a garbage collector.",
    subject: "Programming",
    topic: "Systems Programming & Concurrency",
    type: "video",
    fileName: "Rust_vs_Cpp_Memory_Model.mp4",
    fileSize: "172 MB",
    thumbnailUrl: "/images/coding_study_thumb_1791559434489.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "26:30",
    views: 3120,
    favouritesCount: 375,
    createdAt: "2025-03-18T16:00:00Z",
  },
];
