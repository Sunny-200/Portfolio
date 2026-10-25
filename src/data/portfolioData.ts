export interface ProjectCaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  timeline: string;
  tech: string[];
  metrics: { label: string; value: string; description: string }[];
  problem: string;
  architecture: string[];
  keyDecisions: { title: string; rationale: string; tradeOff: string }[];
  implementationDetails: string[];
  challengesAndTradeoffs: string;
  testingAndVerification: string[];
  lessonsLearned: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface OpenSourceContribution {
  organization: string;
  repo: string;
  prNumber: number;
  prTitle: string;
  prUrl: string;
  issueNumber: number;
  issueUrl: string;
  branch: string;
  stats: { files: number; additions: number; deletions: number };
  status: string;
  overview: string;
  theProblem: string;
  theSolution: string;
  keyContributions: {
    area: string;
    file: string;
    summary: string;
    details: string[];
  }[];
  operators: {
    symbol: string;
    name: string;
    purpose: string;
    paradeDbBefore: string;
    paradeDbAfter: string;
    postgresSqlExample: string;
  }[];
  benchmarkMethodology: {
    datasetSize: string;
    selectivityRegimes: {
      regime: string;
      percentage: string;
      description: string;
      filterPattern: string;
      queryType: string;
    }[];
    methodologyNote: string;
    benchmarkFile: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    featuredIn?: string;
    details: string;
  }[];
}

export interface EngineeringPrinciple {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  systemContext: string;
  architecturalPillar: string;
  keyTakeaway: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Yeruva Mahesh Reddy",
    initials: "YMR",
    role: "Software Engineer / Systems & Infrastructure",
    heroHeadline: "I build the systems beneath the interface.",
    heroSupporting:
      "Distributed systems, database internals, networked software, and AI-powered search.",
    bio: "I build software by understanding what happens beneath the interface—from distributed requests and cache behavior to socket communication, database indexes, and AI-powered retrieval. I enjoy turning complex engineering problems into systems that are measurable, reliable, and thoughtfully designed.",
    education: {
      institution: "Indian Institute of Information Technology Dharwad (IIIT Dharwad)",
      degree: "B.Tech in Computer Science and Engineering",
      minor: "Cybersecurity",
      timeline: "Aug 2023 – Expected 2027",
      cgpa: "7.79",
      location: "Karnataka, India",
    },
    contact: {
      email: "maheshyeruva2005@gmail.com",
      github: "https://github.com/Sunny-200",
      linkedin: "https://www.linkedin.com/in/mahesh-reddy-9062922a7/",
      leetcode: "https://leetcode.com/u/maheshyeruva2005/",
      codechef: "https://www.codechef.com/users/sunny_200",
      parchmentBadge:
        "https://badges.parchment.com/public/assertions/b3MigISCRIK121WIxxw6-g",
      resume:
        "https://drive.google.com/file/d/1WewPOhDFJlpPkdNUHSk1GRq2__JNMAuI/view?usp=drive_link",
    },
  },

  technicalIdentityStrip: [
    "BACKEND ENGINEERING",
    "DISTRIBUTED SYSTEMS",
    "DATABASE INTERNALS",
    "NETWORKING & IPC",
    "AI SEARCH & RAG",
    "SYSTEMS OBSERVABILITY",
  ],

  projects: [
    {
      id: "intellifile",
      slug: "intellifile",
      number: "01",
      title: "IntelliFile — Agentic AI-Powered File Search",
      shortTitle: "IntelliFile",
      tagline:
        "Local-first Windows desktop search engine unifying BM25 and vector retrieval with offline LLM query planning.",
      category: "AI Systems & Local Retrieval",
      timeline: "2024 – 2025",
      tech: [
        "Python",
        "FastAPI",
        "React",
        "TypeScript",
        "Rust",
        "Tauri",
        "SQLite FTS5",
        "BM25",
        "LanceDB",
        "Qwen2.5",
      ],
      metrics: [
        {
          label: "Retrieval Accuracy",
          value: "100%",
          description: "Top-5 retrieval accuracy across 60 labelled test queries",
        },
        {
          label: "P95 Latency",
          value: "21 ms",
          description: "Sub-25ms response time on local disk index lookups",
        },
        {
          label: "Embedding Efficiency",
          value: "97% → 43%",
          description:
            "Embedding model invocations reduced via adaptive routing while retaining accuracy",
        },
        {
          label: "Air-Gapped Privacy",
          value: "26 / 26",
          description:
            "Guarded test suites passed with 0 outbound network calls",
        },
      ],
      problem:
        "Traditional desktop search operates either as brute-force filename matching or heavyweight cloud-reliant indexing. Users storing confidential documents, scanned PDFs, audio transcripts, and codebases need sub-second semantic retrieval without transmitting private bytes to third-party APIs.",
      architecture: [
        "Local Desktop Shell: Rust/Tauri frontend providing a minimal memory footprint and native OS file hooks.",
        "FastAPI Local Daemon: Exposes IPC endpoints for query processing, document chunking, and metadata extraction.",
        "Dual Retrieval Engine: SQLite FTS5 with BM25 token weighting for exact technical keywords, alongside LanceDB vector storage for deep semantic embeddings.",
        "Reciprocal Rank Fusion (RRF): Blends rank lists from keyword and vector spaces using constant smoothing k=60.",
        "Cross-Encoder Reranker & Quantized LLM: Offline Qwen2.5 extracts contextual snippets and synthesizes source-grounded answers.",
      ],
      keyDecisions: [
        {
          title: "Hybrid Reciprocal Rank Fusion over Pure Vector Search",
          rationale:
            "Pure dense embeddings frequently fail on exact identifiers like hash strings, variable names, and error codes. SQLite FTS5 handles exact matches with zero model overhead, while LanceDB catches conceptual queries.",
          tradeOff:
            "Requires maintaining two parallel indexes and running a fusion step, increasing initial disk indexing time by 15% in exchange for zero false negatives.",
        },
        {
          title: "Adaptive Search Routing",
          rationale:
            "Heuristic classifier routes queries with unambiguous syntax directly to FTS5 BM25, avoiding costly floating-point vector dot products when semantic expansion is unnecessary.",
          tradeOff:
            "Heuristic must be calibrated carefully to avoid misclassifying subtle semantic queries as simple keyword searches.",
        },
        {
          title: "Zero-Outbound Airgap Guard",
          rationale:
            "Desktop security model guarantees that local user documents, embeddings, and chat transcripts never touch external sockets.",
          tradeOff:
            "Models must be quantized to fit within consumer RAM/VRAM constraints without server GPU acceleration.",
        },
      ],
      implementationDetails: [
        "Implemented multi-format extractors for scanned PDFs (OCR), DOCX, MP3 (offline Whisper), and code repositories.",
        "Engineered chunking strategies with sliding windows and overlap boundaries to preserve semantic context across section breaks.",
        "Integrated LanceDB columnar storage using Arrow buffers for fast nearest-neighbor lookups without heavy database server dependencies.",
      ],
      challengesAndTradeoffs:
        "Balancing local CPU utilization during background indexing against foreground search responsiveness. Solved by implementing an adaptive token-bucket throttler that pauses vector generation when OS mouse/keyboard activity is detected.",
      testingAndVerification: [
        "Evaluated across a benchmark dataset of 60 labelled engineering queries, achieving 100% top-5 retrieval accuracy.",
        "Socket-level test harness verified 0 outbound network attempts across 26 test scripts.",
        "Load tested concurrent query throughput with P95 latency stabilizing at 21ms.",
      ],
      lessonsLearned: [
        "Hybrid search consistently outperforms single-modal retrieval in developer-oriented workloads.",
        "Local-first software requires strict memory budgets; zero-copy Arrow memory sharing is essential for desktop AI tools.",
      ],
      githubUrl: "https://github.com/Sunny-200/Intelli-file",
    },

    {
      id: "url-shortener",
      slug: "url-shortener",
      number: "02",
      title: "Distributed URL Shortener Service",
      shortTitle: "Distributed URL Shortener",
      tagline:
        "Microservices URL redirection and analytics engine with Redis multi-tier caching and Kubernetes replica failover.",
      category: "Distributed Systems & Cloud Infrastructure",
      timeline: "Jan 2025 – Mar 2025",
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Docker",
        "Kubernetes",
        "Nginx",
      ],
      metrics: [
        {
          label: "Latency Reduction",
          value: "40%",
          description: "Drop in URL redirection latency via Redis hot-key caching",
        },
        {
          label: "Daily Throughput",
          value: "10,000+",
          description: "Redirection and analytical event requests handled per day",
        },
        {
          label: "Service Uptime",
          value: "99.9%",
          description:
            "Maintained via Kubernetes Horizontal Pod Autoscaler & health probes",
        },
        {
          label: "Data Integrity",
          value: "Zero Loss",
          description:
            "MongoDB 3-node replica set with automated primary election failover",
        },
      ],
      problem:
        "High-volume redirection systems face extreme read-to-write skew (often 100:1). Direct database queries for every redirection saturate connection pools, spike latencies, and risk catastrophic outages during traffic bursts.",
      architecture: [
        "Nginx Layer: Acts as the edge reverse proxy, terminating TLS, rate-limiting malicious IPs, and balancing HTTP traffic.",
        "Stateless API Microservices: Decoupled URL generation and high-throughput redirection endpoints.",
        "Distributed Redis Cache: In-memory key-value cache holding active shortcodes with dynamic TTL expiration and LRU eviction.",
        "Persistent MongoDB Replica Set: Multi-node database with replica sets providing durable long-term storage and automated failover election.",
        "Kubernetes Orchestration: Containerized microservices deployed with HPA (Horizontal Pod Autoscaler) responding to CPU/request metrics, with liveness and readiness probes.",
      ],
      keyDecisions: [
        {
          title: "Cache-Aside Pattern with Dynamic TTL",
          rationale:
            "Incoming redirect requests check Redis first. Cache hits return HTTP 302 redirects immediately. Cache misses query MongoDB secondary replicas and populate Redis asynchronously.",
          tradeOff:
            "Risk of cache stampede during sudden viral spikes, mitigated by adding random jitter to cache expiration timestamps.",
        },
        {
          title: "Separation of Redirection Path from Analytics Ingestion",
          rationale:
            "The redirection path must never be delayed by disk writes for click analytics (referrer, user-agent, IP geolocation).",
          tradeOff:
            "Analytics events are queued asynchronously, introducing a slight eventual-consistency lag in dashboard views in exchange for minimal redirect latency.",
        },
      ],
      implementationDetails: [
        "Configured Base62 encoding on distributed snowflake-like unique IDs to generate collision-free 6-character short hashes.",
        "Implemented Redis pipelining for batch telemetry aggregation, reducing round-trip overhead.",
        "Set up Docker compose local clustering and Kubernetes YAML manifests defining Deployments, ClusterIP Services, ConfigMaps, and Ingress.",
      ],
      challengesAndTradeoffs:
        "Handling database primary failover without dropping in-flight redirects. Configured MongoDB connection drivers with `readPreference=secondaryPreferred` for redirect reads, allowing the service to serve redirects continuously even during primary election windows.",
      testingAndVerification: [
        "Load tested with simulated concurrent requests exceeding 10k requests/day profile.",
        "Simulated node termination in Kubernetes cluster; HPA auto-scaled pods with zero dropped connections.",
        "Observed 40% reduction in redirect response time under load compared to un-cached baseline.",
      ],
      lessonsLearned: [
        "Read-heavy microservices require strict cache segregation.",
        "Proper readiness and liveness probe thresholds are critical to prevent Kubernetes cascading restart loops under heavy load.",
      ],
      githubUrl: "https://github.com/Sunny-200/url_shortener",
    },

    {
      id: "synthetic-monitoring",
      slug: "synthetic-web-monitoring",
      number: "03",
      title: "Synthetic Web Monitoring",
      shortTitle: "Synthetic Web Monitoring",
      tagline:
        "Multi-process Linux systems monitoring engine with non-blocking POSIX sockets, poll() multiplexing, and isolated worker processes.",
      category: "Systems Programming & Networking",
      timeline: "2024",
      tech: [
        "C++",
        "POSIX sockets",
        "Linux",
        "IPC",
        "poll()",
        "Make",
        "Unix domain sockets",
      ],
      metrics: [
        {
          label: "Worker Concurrency",
          value: "5 Workers",
          description: "Isolated child worker processes per Agent node",
        },
        {
          label: "I/O Model",
          value: "Non-blocking",
          description: "poll() multiplexing across all active network descriptors",
        },
        {
          label: "Protocol Format",
          value: "Fixed Binary",
          description: "32-byte binary protocol headers preventing buffer overflows",
        },
        {
          label: "Crash Isolation",
          value: "100%",
          description:
            "Worker process termination caught via SIGCHLD without crashing Agent core",
        },
      ],
      problem:
        "Synthetic health checking of distributed web infrastructure requires microsecond-accurate TCP handshake and TLS timing. Thread-based architectures in high-concurrency environments suffer from context switching overhead and memory corruption risks if third-party libraries segfault.",
      architecture: [
        "Core Orchestration Daemon: Maintains global scheduling queues and distributes target URL synthetic probes across 3 Agent servers.",
        "Agent Process Cluster: Listens on dedicated TCP sockets, communicates with Core via structured binary protocol, and dispatches probes to sandboxed workers.",
        "Worker Process Isolation: Agents spawn isolated child workers using fork() and communicate bidirectionally via Unix-domain socketpair().",
        "I/O Multiplexing: poll() event loop simultaneously tracks Core communication, socketpair IPC, and worker lifecycle events.",
      ],
      keyDecisions: [
        {
          title: "Process-Based Isolation vs. Multi-threading",
          rationale:
            "Network probes often parse malformed HTTP headers or SSL handshakes. Spawning child workers guarantees that a segmentation fault or memory leak in one probe process never terminates the parent Agent.",
          tradeOff:
            "Slightly higher process creation overhead compared to thread pools, managed by worker recycling after probe execution.",
        },
        {
          title: "Fixed-Size Binary Protocol Headers",
          rationale:
            "Instead of parsing expensive JSON or text-based protocols over raw sockets, implemented custom C++ structs with explicit byte packing.",
          tradeOff:
            "Requires strict endianness and structure alignment handling across architectures, but eliminates serialization latency.",
        },
      ],
      implementationDetails: [
        "Engineered non-blocking socket state machines transitioning through CONNECTING, TLS_HANDSHAKE, HTTP_SEND, and RECEIVE_HEADER states.",
        "Implemented high-resolution POSIX clock timing (`clock_gettime(CLOCK_MONOTONIC)`) to measure DNS resolution, TCP connect, and TTFB with sub-millisecond precision.",
        "Created custom Make build configuration with strict compiler warnings (`-Wall -Wextra -Wpedantic -O2`).",
      ],
      challengesAndTradeoffs:
        "Preventing zombie processes and socket descriptor leaks when child workers timed out on hung remote endpoints. Resolved using POSIX non-blocking `waitpid()` inside a `SIGCHLD` signal handler and kernel alarm timers.",
      testingAndVerification: [
        "Tested against slowloris-style hanging web servers to confirm worker timeouts cleanly terminate.",
        "Verified non-blocking `poll()` event loop handles agent reconnection cleanly upon network drop.",
      ],
      lessonsLearned: [
        "Low-level POSIX systems programming provides unmatched predictability and insight into operating system resource limits.",
        "Unix domain socketpairs offer faster and safer IPC than shared memory when process fault isolation is paramount.",
      ],
      githubUrl: "https://github.com/Sunny-200/Synthetic_web_monitoring",
    },

    {
      id: "encrypted-chat",
      slug: "encrypted-chat",
      number: "04",
      title: "Real-Time Encrypted Chat Application",
      shortTitle: "Encrypted Chat Platform",
      tagline:
        "Full-stack WebSocket messaging system featuring end-to-end encryption, role-based access control, and AWS S3 presigned media pipeline.",
      category: "Networked Software & Security",
      timeline: "Sep 2024 – Dec 2024",
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "AWS S3",
        "Bcrypt",
      ],
      metrics: [
        {
          label: "Concurrent Users",
          value: "100+",
          description: "Tested real-time websocket connections with zero drops",
        },
        {
          label: "Security Audit",
          value: "90% Reduction",
          description: "Unauthorized access risk lowered via E2EE and verified email tokens",
        },
        {
          label: "Media Uploads",
          value: "Direct S3",
          description:
            "Zero server bandwidth overhead via presigned URL uploads",
        },
        {
          label: "Message Schema",
          value: "Indexed",
          description: "Compound indexing on user-chat relational schemas",
        },
      ],
      problem:
        "Modern messaging platforms need real-time responsiveness without compromising on privacy, access control, or server bandwidth when exchanging multimedia attachments.",
      architecture: [
        "WebSocket Real-Time Engine: Socket.IO rooms for 1-to-1 and group chats, broadcasting typing indicators, read receipts, and message state transitions.",
        "Security Layer: End-to-end encrypted message payloads, bcrypt password hashing, and email verification tokens.",
        "Role-Based Access Control (RBAC): Hierarchical group permissions allowing administrators to manage member status, message moderation, and reporting.",
        "AWS S3 Media Pipeline: Server issues short-lived presigned URLs for client direct-to-S3 uploads, keeping media streaming off the API application servers.",
      ],
      keyDecisions: [
        {
          title: "Presigned S3 URLs over Server-Proxied Uploads",
          rationale:
            "Uploading high-resolution images or videos through Node.js consumes valuable event loop cycles and memory buffers. Presigned URLs allow direct browser-to-S3 uploads.",
          tradeOff:
            "Requires additional client-side coordination to verify upload completion before emitting the message payload.",
        },
      ],
      implementationDetails: [
        "Engineered MongoDB compound indexes on `{ chatId: 1, timestamp: -1 }` for instant message paging.",
        "Implemented soft-delete markers and edit history trails preserving message relational integrity.",
      ],
      challengesAndTradeoffs:
        "Handling socket reconnection synchronization when users temporarily lose network connectivity. Built an offline message queue with timestamp reconciliation.",
      testingAndVerification: [
        "Stress tested with 100+ simulated concurrent WebSocket connections.",
        "Verified RBAC boundary constraints against unauthorized permission escalation attempts.",
      ],
      lessonsLearned: [
        "Real-time event architecture requires clear separation between ephemeral presence states and persistent message storage.",
      ],
      githubUrl: "https://github.com/Sunny-200",
    },
  ] as ProjectCaseStudy[],

  openSource: {
    organization: "ParadeDB",
    repo: "paradedb/paradedb",
    prNumber: 6877,
    prTitle: "Deprecate in-index ltree support in favor of PostgreSQL GiST bitmap intersection",
    prUrl: "https://github.com/paradedb/paradedb/pull/6877",
    issueNumber: 6093,
    issueUrl: "https://github.com/paradedb/paradedb/issues/6093",
    branch: "feat/6093-ltree-benchmark",
    status: "MERGED INTO UPSTREAM MAIN",
    stats: {
      files: 12,
      additions: 211,
      deletions: 9,
    },
    overview:
      "ParadeDB is an open-source database engine built on top of PostgreSQL for modern search and analytics. This contribution establishes a deprecation path for ParadeDB's custom in-index ltree facet pushdown in favor of standard PostgreSQL GiST indexing combined with bitmap index intersection, significantly expanding hierarchical query operator capabilities and preserving native PostgreSQL semantics.",

    theProblem:
      "ParadeDB previously offered an in-index facet implementation for PostgreSQL's `ltree` extension (used for hierarchical tree-like data). However, this custom in-index facet pushdown only supported a single operator: the descendant operator `<@`. In contrast, PostgreSQL's standard native GiST index on `ltree` supports a much richer set of hierarchical operators (such as ancestor `@>`, pattern matching `~`, and full text label queries `?`). Retaining a proprietary in-index ltree implementation created maintenance overhead, code duplication, and functional limitations for users who required full hierarchical filtering.",

    theSolution:
      "Rather than attempting to reinvent every native PostgreSQL hierarchical operator inside ParadeDB's search indexes, the clean architectural solution was to deprecate the in-index ltree representation and instruct PostgreSQL to leverage its native GiST ltree index via bitmap index intersection with ParadeDB search results. My contribution provided the end-to-end deprecation path: comprehensive benchmarks across four selectivity regimes, index creation deprecation warnings, integration test coverage across multiple GiST operators, execution-plan documentation, and breaking change release notes.",

    keyContributions: [
      {
        area: "Benchmarking Framework",
        file: "benchmarks/ltree_benchmark.sql",
        summary:
          "Authored a structured SQL benchmarking suite evaluating 100,000 rows across 4 selectivity regimes.",
        details: [
          "Generated a synthetic hierarchical dataset simulating e-commerce category trees of 100,000 rows.",
          "Designed 4 selectivity regimes (Ultra-low <0.01%, Low ~0.1%, Medium ~1%, High >5%).",
          "Compared in-index facet pushdown against native GiST index bitmap intersection with ParadeDB search results.",
          "Documented query execution plans with `EXPLAIN (ANALYZE, BUFFERS)` to trace shared hit buffers and index scans.",
        ],
      },
      {
        area: "Deprecation Warning Handling",
        file: "src/index/ltree.rs & validation hooks",
        summary:
          "Added create-time deprecation warnings when indexes are defined with ltree fields.",
        details: [
          "Emitted a descriptive warning advising users to utilize native PostgreSQL GiST indexes instead of ParadeDB ltree fields.",
          "Preserved backwards compatibility so existing indexes continue functioning while guiding new deployments toward the standard architecture.",
        ],
      },
      {
        area: "Integration Testing Suite",
        file: "tests/tests/ltree.rs",
        summary:
          "Added integration tests covering PostgreSQL GiST operators with ParadeDB queries.",
        details: [
          "Wrote tests validating `<@` (descendant of), `~` (lquery regex-like matching), and `@>` (ancestor of).",
          "Validated that bitmap intersection between ParadeDB index scans and PostgreSQL GiST scans produces identical results.",
          "Updated regression-test expected outputs across the test pipeline.",
        ],
      },
      {
        area: "Documentation & Changelog",
        file: "docs/reference/filtering/external-indexes.mdx & unreleased/6093.breaking.mdx",
        summary:
          "Documented the external index pattern and authored the breaking change migration guide.",
        details: [
          "Wrote technical reference guide showing how PostgreSQL planner combines native GiST indexes with ParadeDB search indexes.",
          "Provided realistic query examples and annotated `EXPLAIN (ANALYZE)` execution plans.",
          "Authored unreleased changelog fragment `6093.breaking.mdx` explaining the migration rationale.",
        ],
      },
    ],

    operators: [
      {
        symbol: "<@",
        name: "Is Descendant Of",
        purpose: "Matches labels that are sub-paths or descendants of a given path (e.g., Top.Science.Physics <@ Top.Science).",
        paradeDbBefore: "Supported via in-index facet pushdown, but with proprietary code maintenance.",
        paradeDbAfter: "Fully supported via native PostgreSQL GiST index and BitmapAnd intersection.",
        postgresSqlExample: "SELECT * FROM catalog WHERE path <@ 'Top.Electronics.Audio';",
      },
      {
        symbol: "@>",
        name: "Is Ancestor Of",
        purpose: "Matches labels that are ancestors of a specified tree node (e.g., Top.Science @> Top.Science.Physics).",
        paradeDbBefore: "NOT supported in ParadeDB in-index ltree facets.",
        paradeDbAfter: "Fully supported natively using GiST index scans.",
        postgresSqlExample: "SELECT * FROM catalog WHERE path @> 'Top.Electronics.Audio.Headphones';",
      },
      {
        symbol: "~",
        name: "Matches lquery",
        purpose: "Matches hierarchical path against a wildcard lquery pattern (e.g., '*.Computers.*.Laptops').",
        paradeDbBefore: "NOT supported in ParadeDB in-index ltree facets.",
        paradeDbAfter: "Fully supported natively with GiST tree path matching.",
        postgresSqlExample: "SELECT * FROM catalog WHERE path ~ '*.Hardware.*.CPUs';",
      },
      {
        symbol: "?",
        name: "Matches ltxtquery",
        purpose: "Performs full-text style boolean searches on hierarchical labels (e.g., 'Science & !Physics').",
        paradeDbBefore: "NOT supported in ParadeDB in-index ltree facets.",
        paradeDbAfter: "Fully supported natively via PostgreSQL ltree operator classes.",
        postgresSqlExample: "SELECT * FROM catalog WHERE path ? 'Electronics & !Refurbished';",
      },
    ],

    benchmarkMethodology: {
      datasetSize: "100,000 Hierarchical Rows",
      benchmarkFile: "benchmarks/ltree_benchmark.sql",
      selectivityRegimes: [
        {
          regime: "Ultra-Low Selectivity (<0.01%)",
          percentage: "< 0.01% of rows",
          description: "Targeted sub-tree lookup matching only 5-10 specific leaf nodes.",
          filterPattern: "path <@ 'Top.Category.LeafSubtype.SpecificID'",
          queryType: "Highly selective point/small-branch filter",
        },
        {
          regime: "Low Selectivity (~0.1%)",
          percentage: "~ 0.1% of rows",
          description: "Niche departmental category matching ~100 rows out of 100k.",
          filterPattern: "path <@ 'Top.Electronics.SpecializedAudio'",
          queryType: "Standard category page filter",
        },
        {
          regime: "Medium Selectivity (~1%)",
          percentage: "~ 1.0% of rows",
          description: "Broad department-level branch matching ~1,000 rows.",
          filterPattern: "path <@ 'Top.Electronics'",
          queryType: "Broad department browse",
        },
        {
          regime: "High Selectivity (>5%)",
          percentage: "> 5.0% of rows",
          description: "Top-level division branch matching 5,000+ rows across large product lines.",
          filterPattern: "path <@ 'Top.ConsumerGoods'",
          queryType: "High-volume aggregation boundary",
        },
      ],
      methodologyNote:
        "The benchmark evaluates execution plan behavior across both approaches using PostgreSQL's EXPLAIN (ANALYZE, BUFFERS). It directly observes how the PostgreSQL cost optimizer chooses between sequential scans, ParadeDB index pushdown, and GiST BitmapIndexScans followed by BitmapAnd intersection with ParadeDB search results. Note: Rather than publishing arbitrary hardware-dependent timing figures, this suite provides reproducible methodology for database engineers to run directly in their environments.",
    },
  } as OpenSourceContribution,

  principles: [
    {
      id: "distributed-systems",
      number: "01",
      title: "Distributed Systems",
      tagline: "Failure is not an exception; it is the default operating condition.",
      description:
        "Networks partition, processes crash, clocks drift, and disks stall. Robust distributed engineering designs around explicit failure boundaries, idempotency, backpressure, and observable state transitions.",
      systemContext:
        "Applied in the Distributed URL Shortener via Redis failover caches, MongoDB replica sets with automated primary election, and Kubernetes readiness probes preventing partial outage cascades.",
      architecturalPillar: "Partition Tolerance & Graceful Degradation",
      keyTakeaway:
        "Never trust synchronous dependencies without bounded timeouts and circuit breakers.",
    },
    {
      id: "systems-programming",
      number: "02",
      title: "Systems Programming",
      tagline: "High-level abstractions are only as efficient as the kernel primitives beneath them.",
      description:
        "Understanding Linux processes, file descriptors, virtual memory, non-blocking I/O multiplexing with poll(), and IPC primitives reveals where CPU cycles and context-switching overhead truly accumulate.",
      systemContext:
        "Demonstrated in Synthetic Web Monitoring using fork() and socketpair() for worker isolation, fixed-size binary structs, and non-blocking socket loops.",
      architecturalPillar: "Zero-Copy & Memory Predictability",
      keyTakeaway:
        "Process isolation guarantees fault tolerance when executing untrusted network probes.",
    },
    {
      id: "database-engineering",
      number: "03",
      title: "Database Engineering",
      tagline: "Indexes dictate performance; query planners dictate reality.",
      description:
        "Databases are not magic black boxes. Every query involves cost-model evaluations, disk page I/O, cache line lookups, and index intersection trade-offs. Knowing when to push filters down vs. when to use bitmap intersections defines scalable storage architectures.",
      systemContext:
        "Validated through the ParadeDB upstream contribution, deprecating in-index ltree facets in favor of native PostgreSQL GiST bitmap intersections across 100k-row benchmarks.",
      architecturalPillar: "Optimizer Alignment & Index Ergonomics",
      keyTakeaway:
        "Don't reinvent index operators that the underlying database engine already implements with superior semantics.",
    },
    {
      id: "ai-search",
      number: "04",
      title: "AI-Powered Search & RAG",
      tagline: "Vector search without lexical grounding produces confident hallucinations.",
      description:
        "Dense vectors capture semantics; sparse tokens capture precision. High-accuracy retrieval combines BM25 keyword matching with vector embeddings via Reciprocal Rank Fusion, followed by reranking and source-grounded synthesis.",
      systemContext:
        "Engineered into IntelliFile, achieving 100% top-5 accuracy while reducing embedding compute by 54% through intelligent query classification.",
      architecturalPillar: "Hybrid Retrieval & Air-Gapped Privacy",
      keyTakeaway:
        "Selective model invocation beats brute-force embedding on every metric: speed, cost, and accuracy.",
    },
    {
      id: "infrastructure-observability",
      number: "05",
      title: "Infrastructure & Observability",
      tagline: "If it cannot be measured, it cannot be trusted in production.",
      description:
        "Containers, ingress controllers, horizontal pod autoscalers, and continuous deployment pipelines are only effective when backed by structured telemetry, liveness health checks, and reproducible configurations.",
      systemContext:
        "Implemented across Kubernetes deployments with HPA, automated health probes, Nginx reverse proxy load balancing, and strict CI/CD pipelines.",
      architecturalPillar: "Immutable Infrastructure & Self-Healing",
      keyTakeaway:
        "Configure health probes based on genuine downstream dependencies, not superficial ping endpoints.",
    },
  ] as EngineeringPrinciple[],

  skillsData: [
    {
      category: "Languages",
      skills: [
        { name: "C++", featuredIn: "synthetic-monitoring", details: "POSIX sockets, IPC, poll(), memory layouts, Make" },
        { name: "C", featuredIn: "synthetic-monitoring", details: "Low-level system calls, structures, pointer arithmetic" },
        { name: "Python", featuredIn: "intellifile", details: "FastAPI, PyTorch/Transformers, RAG pipelines, LanceDB" },
        { name: "JavaScript / TypeScript", featuredIn: "url-shortener", details: "Node.js, Express, React, Next.js, asynchronous event loops" },
        { name: "SQL", featuredIn: "paradedb", details: "PostgreSQL internals, indexing, EXPLAIN ANALYZE, complex queries" },
        { name: "Java", details: "Object-oriented systems, data structures, concurrency" },
        { name: "Bash", details: "Linux automation, scripting, deployment tooling" },
      ],
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js & Express.js", featuredIn: "url-shortener", details: "REST APIs, microservices, middleware architectures" },
        { name: "REST APIs", featuredIn: "url-shortener", details: "Idempotent resource design, status contracts, rate limiting" },
        { name: "Microservices", featuredIn: "url-shortener", details: "Decoupled domain boundaries, service discovery" },
        { name: "POSIX Sockets & IPC", featuredIn: "synthetic-monitoring", details: "TCP/IP client-server, socketpair(), fork(), non-blocking I/O" },
        { name: "poll() I/O Multiplexing", featuredIn: "synthetic-monitoring", details: "Scalable event-driven file descriptor management" },
        { name: "Socket.IO", featuredIn: "encrypted-chat", details: "Real-time bidirectional event streaming and rooms" },
      ],
    },
    {
      category: "Databases & Storage",
      skills: [
        { name: "PostgreSQL", featuredIn: "paradedb", details: "GiST indexes, bitmap intersection, query planning, ltree extension" },
        { name: "Redis", featuredIn: "url-shortener", details: "In-memory caching, TTL policies, LRU eviction, pipelining" },
        { name: "MongoDB", featuredIn: "url-shortener", details: "Replica sets, failover election, compound indexing, aggregation" },
        { name: "SQLite FTS5", featuredIn: "intellifile", details: "Full-text search, BM25 ranking, tokenizers" },
        { name: "LanceDB", featuredIn: "intellifile", details: "Columnar vector storage, Arrow memory format, nearest neighbor" },
        { name: "MySQL", details: "Relational modeling, ACID transactions, foreign keys" },
      ],
    },
    {
      category: "AI / ML & Search",
      skills: [
        { name: "RAG Architectures", featuredIn: "intellifile", details: "Retrieval-Augmented Generation, chunking, source-grounding" },
        { name: "Hybrid Search (BM25 + Vectors)", featuredIn: "intellifile", details: "Reciprocal Rank Fusion, dual-index querying" },
        { name: "Vector Embeddings", featuredIn: "intellifile", details: "Dense vector spaces, semantic similarity, cosine distance" },
        { name: "LLMs & Quantization", featuredIn: "intellifile", details: "Offline inference with Qwen2.5, prompt framing, agentic routing" },
        { name: "Transformer Architectures", details: "Self-attention mechanics, encoder-decoder representations" },
      ],
    },
    {
      category: "Cloud, DevOps & Tools",
      skills: [
        { name: "Docker", featuredIn: "url-shortener", details: "Multi-stage builds, container isolation, minimal images" },
        { name: "Kubernetes", featuredIn: "url-shortener", details: "Pods, Deployments, Services, HPA, readiness/liveness probes" },
        { name: "Nginx", featuredIn: "url-shortener", details: "Reverse proxy, load balancing, SSL termination" },
        { name: "AWS (S3, EC2)", featuredIn: "encrypted-chat", details: "Presigned URLs, cloud hosting, storage lifecycle" },
        { name: "Git & GitHub Actions", featuredIn: "paradedb", details: "Collaborative open source PRs, CI/CD automated test runs" },
        { name: "Linux Administration", featuredIn: "synthetic-monitoring", details: "Process trees, signals, memory diagnostics, system calls" },
      ],
    },
  ] as SkillCategory[],

  achievements: [
    {
      number: "300+",
      label: "DSA Problems Solved",
      sublabel: "LeetCode & Competitive Platforms",
      detail: "Deep algorithmic problem solving covering trees, graphs, dynamic programming, and binary search.",
    },
    {
      number: "1650",
      label: "LeetCode Contest Rating",
      sublabel: "Top Competitive Percentile",
      detail: "Demonstrating consistent optimization, time-complexity analysis, and edge-case handling.",
    },
    {
      number: "1500",
      label: "CodeChef Rating",
      sublabel: "Ranked Competitive Programmer",
      detail: "Regular participant in algorithmic contests solving timed challenges under pressure.",
    },
    {
      number: "PR #6877",
      label: "ParadeDB Upstream Merged",
      sublabel: "Production Database Engine",
      detail: "Authored deprecation framework, 100k-row benchmarks, and test suites across 12 files in upstream main.",
    },
  ],

  certificationsAndTraining: [
    {
      title: "Postman API Student Expert",
      issuer: "Postman",
      date: "Verified",
      verifiedUrl: "https://badges.parchment.com/public/assertions/b3MigISCRIK121WIxxw6-g",
      isCredentialBadge: true,
      description: "Hands-on certification in API design, automated testing, request chaining, and endpoint security.",
    },
    {
      title: "AWS Partner: Generative AI on AWS (Technical)",
      issuer: "Amazon Web Services",
      date: "August 14, 2026",
      isCredentialBadge: false,
      description: "Technical training on foundation models, fine-tuning, retrieval augmentation, and scalable inference architectures.",
    },
    {
      title: "AWS Partner: Agentic AI Essentials",
      issuer: "Amazon Web Services",
      date: "August 14, 2026",
      isCredentialBadge: false,
      description: "Architecture patterns for autonomous agent workflows, tool orchestration, and memory management.",
    },
    {
      title: "Data Scientist Learning Plan (Partner)",
      issuer: "Amazon Web Services",
      date: "August 14, 2026",
      isCredentialBadge: false,
      description: "Comprehensive training on distributed data preparation, model training pipelines, and feature engineering.",
    },
    {
      title: "Fundamentals of Analytics on AWS (Parts 1 & 2)",
      issuer: "Amazon Web Services",
      date: "August 14, 2026",
      isCredentialBadge: false,
      description: "Data warehousing, real-time streaming architectures, and distributed query processing.",
    },
    {
      title: "AWS Partner: Migrating Workloads to AWS (Technical)",
      issuer: "Amazon Web Services",
      date: "July 30, 2026",
      isCredentialBadge: false,
      description: "Technical methodologies for database re-platforming, microservices containerization, and hybrid cloud migrations.",
    },
    {
      title: "AWS Partner: Cloud Economics Essentials",
      issuer: "Amazon Web Services",
      date: "July 30, 2026",
      isCredentialBadge: false,
      description: "Cost-optimization models, provisioned IOPS planning, and resource rightsizing in cloud environments.",
    },
  ],
};
