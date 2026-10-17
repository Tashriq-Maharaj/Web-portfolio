/**
 * Blog Articles Data Store
 * Source of truth for portfolio articles.
 * 
 * Accurately reflects real projects, technologies, and architecture.
 */

const articles = [
  {
    id: "homelab-setup-ubuntu-docker",
    title: "Building a Resilient Homelab with Ubuntu Server, Docker & Prometheus",
    date: "October 2026",
    readTime: "6 min read",
    category: "Homelab & Systems",
    featured: true,
    tags: ["Ubuntu Server", "Docker", "Prometheus", "Grafana", "Portainer", "Python"],
    summary: "A practical walkthrough of running a private Ubuntu Server on a Lenovo ThinkPad T440p, using Docker, Prometheus, Grafana, and Python automation to learn Linux administration and monitoring hands-on.",
    content: `
      <p class="lead text-slate-300 text-base leading-relaxed mb-4">
        The homelab is my personal Ubuntu Server environment, built to gain practical, hands-on experience with Linux administration, Docker containerization, system monitoring, automation, and real-world troubleshooting.
      </p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">1. Hardware & Operating Environment</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        The server runs <strong>Ubuntu Server 22.04 LTS</strong> on a dedicated <strong>Lenovo ThinkPad T440p</strong> laptop. The laptop form factor offers a built-in battery acting as an emergency UPS during brief power dips, along with low power consumption for continuous uptime.
      </p>
      <p class="text-slate-300 mb-4 leading-relaxed">
        The server operates strictly on a <strong>private home network</strong>. It is not intentionally exposed directly to the public internet and does not use port forwarding. All administrative access and service usage happen locally over the internal network.
      </p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">2. Service Isolation with Docker & Portainer</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Rather than installing multiple conflicting packages directly on the host OS, Docker and Docker Compose are used to run and isolate key services:
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li><strong>Portainer:</strong> Provides a lightweight web interface for checking container status, logs, and resource utilization.</li>
        <li><strong>Microsoft SQL Server:</strong> A containerized SQL Server instance used for database testing, query development, and automation scripts.</li>
        <li><strong>Plex Media Server:</strong> Hosts personal media files across the local home network.</li>
        <li><strong>Telemetry Exporters:</strong> Dedicated exporter containers that collect application and host performance metrics.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">3. Monitoring: Prometheus & Grafana</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        To understand system behavior under load, I deployed Prometheus alongside Grafana. Prometheus scrapes operational metrics on regular intervals, while Grafana visualizes the data across custom dashboards.
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li><strong>Node Exporter:</strong> Tracks core host metrics including CPU usage, RAM saturation, disk I/O, storage capacity, and network traffic.</li>
        <li><strong>SQL Exporter & Plex Exporter:</strong> Expose service-level performance and query statistics directly to Prometheus.</li>
        <li><strong>Container Health:</strong> Displays memory limits and container run states to catch unexpected restarts.</li>
      </ul>
      <p class="text-slate-300 mb-4 leading-relaxed">
        This setup is designed as a practical personal implementation to understand observability principles, focusing on actionable dashboards rather than complex enterprise monitoring suites.
      </p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">4. Scheduled Automation & Proactive Alerts</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Beyond real-time dashboards, maintaining reliable uptime requires automated background health checks. I implemented custom Python scripts paired with Linux <strong>systemd services and timers</strong>:
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li><strong>Automated Health Checks:</strong> Scheduled Python scripts verify service reachability, disk threshold limits, and container statuses.</li>
        <li><strong>Multi-Channel Notifications:</strong> When a threshold is breached or a service stops responding, alerts are dispatched automatically via <strong>Telegram bot notifications</strong> and <strong>SMTP email</strong>.</li>
        <li><strong>systemd Timers:</strong> Used instead of standard cron jobs to leverage systemd logging (journalctl) and unified process lifecycle management.</li>
      </ul>

      <blockquote class="border-l-4 border-teal-400 pl-4 py-2 my-6 text-slate-200 italic bg-teal-950/20 rounded-r">
        "Operating this homelab has provided hands-on exposure to concepts commonly encountered in production IT environments: diagnosing container restart loops, inspecting systemd journals, and managing storage and resource constraints."
      </blockquote>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">5. What Was Learned</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Building and maintaining this server taught me that infrastructure reliability comes from clear separation of concerns, repeatable container configurations, and proactive monitoring. It bridges the gap between academic theory and real-world system operations.
      </p>
    `
  },
  {
    id: "incident-response-job-escalation-automation",
    title: "Automating Job Failure Escalations with Python & Flask",
    date: "September 2026",
    readTime: "5 min read",
    category: "Automation",
    featured: true,
    tags: ["Python", "Flask", "PyInstaller", "Automation", "IT Operations"],
    summary: "How a focused Python and Flask desktop tool streamlined the operational workflow of investigating batch failures and compiling standardized escalation emails.",
    content: `
      <p class="lead text-slate-300 text-base leading-relaxed mb-4">
        In IT operations and production support, batch processing workflows run continuously. When an automated job fails overnight, operators must swiftly gather error details and draft an escalation email to engineering teams.
      </p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">The Problem: Repetitive Manual Formatting</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Manually copying error strings, return codes, and system parameters into an email client creates friction and increases the likelihood of typos or missed details during high-pressure incidents. The goal of this project was to automate that repetitive task through a clean, reliable desktop tool.
      </p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">How the Application Works</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        The tool is built with <strong>Python and Flask</strong>, presenting a clean HTML form interface where operators input or paste job execution parameters. The application then processes the data and generates a standardized escalation message.
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li><strong>Regular Expressions:</strong> Used to validate input formats and extract error codes or timestamps from raw job logs.</li>
        <li><strong>HTML Templates:</strong> Renders standardized escalation bodies with consistent formatting, clear priority labels, and required diagnostic fields.</li>
        <li><strong>SMTP Integration:</strong> Enables direct email dispatch to designated distribution groups with a single click.</li>
        <li><strong>Local JSON History:</strong> Stores a rolling history of the last ~50 escalations in a lightweight JSON file. This allows operators to quickly reference recent submissions without the complexity of a database server.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">Secure Configuration with Environment Variables</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Configuration settings are kept strictly separate from the application source code using <code>.env</code> files:
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li>Variables like <code>OPERATORS_GROUP</code> and <code>CSS_PROD</code> define recipient lists and environment endpoints.</li>
        <li>Sensitive configuration is excluded from source control using <code>.gitignore</code>, ensuring credentials and internal routing names are never committed to GitHub.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">Packaging as an Executable with PyInstaller</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        To allow team members to run the application without installing Python or configuring virtual environments, the app is compiled into a standalone executable using <strong>PyInstaller</strong>.
      </p>
      <p class="text-slate-300 mb-4 leading-relaxed">
        A key technical challenge was handling resource paths (HTML templates, static files, and JSON history). The code implements a helper function that checks <code>sys._MEIPASS</code> to correctly locate bundled assets when running as a frozen executable versus standard Python execution.
      </p>

      <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 my-6 font-mono text-xs text-teal-300">
        # Resource path resolution example<br>
        def get_resource_path(relative_path):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))<br>
        &nbsp;&nbsp;&nbsp;&nbsp;return os.path.join(base_path, relative_path)
      </div>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">Practical Takeaways</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        This project was not built as a generic tutorial exercise. It solves a specific, real-world operational problem and demonstrates:
      </p>
      <ul class="list-disc list-outside pl-5 space-y-2 text-slate-300 mb-4">
        <li>Identifying manual friction in operations and automating it with clean code.</li>
        <li>Developing a lightweight, practical Flask tool with secure configuration.</li>
        <li>Packaging Python applications for seamless deployment to end users.</li>
        <li>Translating day-to-day IT support challenges into practical software solutions.</li>
      </ul>
    `
  },
  {
    id: "youtube-audio-sync-homelab",
    title: "From YouTube Playlist to Plex/Filesystem: Automating My Homelab with Python",
    date: "October 2026",
    readTime: "7 min read",
    category: "Automation",
    featured: true,
    tags: ["Python", "Ubuntu Server", "yt-dlp", "FFmpeg", "SQL Server", "Telegram Bot API", "systemd", "Plex"],
    summary: "How I built an automated media synchronization pipeline running on my ThinkPad T440p Ubuntu server, exploring idempotency, concurrency control with file locks, SQL Server logging, and systemd service management.",
    content: `
      <p class="lead text-slate-300 text-base leading-relaxed mb-4">
        I wanted to make managing my local music library easier. Instead of manually downloading audio, converting files, and organizing tracks, I wanted to add a song to a YouTube playlist and let my Ubuntu server handle the rest.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        To achieve this, I built a Python-based automation pipeline running on my ThinkPad T440p homelab server. It uses <code>yt-dlp</code> and <code>FFmpeg</code> to download and process audio, Microsoft SQL Server to record metadata, and Telegram to provide remote notifications and control.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        What started as a convenience project became an opportunity to work with several important software engineering concepts, including idempotency, concurrency control, database integration, and Linux service management.
      </p>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">How It Works</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        The system is built around a Python script called <code>sync_playlist.py</code>, which coordinates the audio synchronization process.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The general workflow is:
      </p>

      <pre class="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 font-mono text-xs sm:text-sm text-teal-300 overflow-x-auto leading-relaxed">YouTube Playlist
       │
       ▼
  yt-dlp + FFmpeg
       │
       ▼
 Local MP3 Library ───► Server file system / Plex
       │
       ▼
 Microsoft SQL Server
  (Metadata Logging)

Telegram Bot ◄────► Python Automation</pre>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The downloader retrieves playlist information and processes eligible tracks into MP3 files. The resulting files are stored locally for Plex to access, while SQL Server records relevant metadata.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        Telegram provides a remote interface for notifications and supported commands, allowing me to monitor the automation without logging into the server every time.
      </p>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">Preventing Duplicate Downloads with Idempotency</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        One of the main challenges with recurring automation is ensuring that running a job repeatedly doesn't result in unnecessary duplicate work.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        I addressed this using <code>yt-dlp</code>'s download archive, <code>archive.txt</code>, which records processed video IDs. On subsequent runs, the downloader can use this archive to skip videos it has already recorded.
      </p>

      <blockquote class="border-l-4 border-teal-400 pl-4 py-2 my-6 text-slate-200 italic bg-teal-950/20 rounded-r">
        "This is an example of idempotency: designing an operation so that repeating it doesn't repeatedly produce the same unintended effects."
      </blockquote>

      <p class="text-slate-300 mb-4 leading-relaxed">
        Using video IDs rather than relying only on filenames also makes the approach more reliable because titles can change or be shared by different videos.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The archive handles download deduplication, while SQL Server serves a separate purpose by providing structured metadata and a record of activity.
      </p>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">Logging Metadata and Monitoring Through Telegram</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        I integrated Microsoft SQL Server into the project using Python's <code>pyodbc</code> package and the SQL Server ODBC driver. This allows the application to record information such as track details, video IDs, and download timestamps, depending on the database schema.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        Keeping this information in a relational database makes it easier to query and inspect the history of the automation rather than relying exclusively on files stored on disk.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        For notifications, I used Python's built-in <code>urllib.request</code> and <code>json</code> modules to communicate directly with the Telegram Bot API, avoiding the need for a separate Telegram bot SDK.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The notification system can report events such as sync progress, completion summaries, and failures. I also implemented message chunking to split longer reports into multiple messages when they approach Telegram's message-length limit.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        This gives me a convenient way to monitor the pipeline remotely while keeping the messaging implementation lightweight.
      </p>

      <!-- Telegram Notification Screenshots -->
      <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 flex flex-col justify-between">
          <img src="images/manualsyncimage.PNG" alt="Interactive Telegram Sync Command" class="rounded-lg w-full max-h-[480px] object-contain mx-auto" loading="lazy" />
          <p class="text-xs font-mono text-slate-400 mt-2 text-center">Interactive <code>Sync</code> command triggering background execution</p>
        </div>
        <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 flex flex-col justify-between">
          <img src="images/1amsystemservice.PNG" alt="Automated Telegram Transfer Summary" class="rounded-lg w-full max-h-[480px] object-contain mx-auto" loading="lazy" />
          <p class="text-xs font-mono text-slate-400 mt-2 text-center">Automated completion summary report with counts & execution time</p>
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">Handling Concurrent Runs and Background Services</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Another important consideration was preventing two synchronization jobs from running simultaneously.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The job can be triggered through different entry points, so overlapping executions could attempt to access shared files or process the same tracks at the same time.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        I addressed this with a file-locking mechanism in <code>lock_manager.py</code>. On Linux, the implementation uses <code>fcntl</code> file locking to coordinate processes that follow the same locking protocol.
      </p>

      <blockquote class="border-l-4 border-teal-400 pl-4 py-2 my-6 text-slate-200 italic bg-teal-950/20 rounded-r">
        "This is an example of concurrency control: protecting shared resources when multiple processes might try to access them at once."
      </blockquote>

      <p class="text-slate-300 mb-4 leading-relaxed">
        I also created <code>bot_listener.py</code> to handle incoming Telegram commands. Rather than relying on a terminal session to keep it running, I deployed the listener as a systemd service using <code>yt-audio-bot.service</code>.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        Systemd manages the service lifecycle and can restart the listener after qualifying failures when configured to do so. This allows the bot to run in the background and be available independently of an interactive login session.
      </p>

      <!-- systemd Service Status Terminal Screenshot -->
      <div class="my-8 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3">
        <img src="images/botlistenerservice.png" alt="systemd service active status in terminal" class="rounded-lg w-full object-contain mx-auto" loading="lazy" />
        <p class="text-xs font-mono text-slate-400 mt-2 text-center">Active systemd listener service running in the background on Ubuntu Server</p>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">Configuration and Security</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        The project uses <code>python-dotenv</code> to load configuration from a <code>.env</code> file, while <code>.gitignore</code> helps prevent that file from being committed to version control.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        This keeps credentials and environment-specific settings separate from the application code, making the project easier to configure and reducing the risk of accidentally exposing secrets in the repository.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        Configuration files still need appropriate filesystem permissions, and secrets that have already been committed must be handled separately. Using <code>.gitignore</code> alone does not secure previously exposed credentials.
      </p>

      <h2 class="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">What I Learned</h2>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Building this project helped me understand how individual tools can be combined into a functioning automation system.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        I gained practical experience with Python process management, download deduplication, operating-system file locks, SQL Server integration, HTTP APIs, and systemd services.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        More importantly, I learned that reliable automation involves more than making a script work once. It requires thinking about repeated execution, shared resources, configuration, failure handling, and visibility into what the system is doing.
      </p>

      <p class="text-slate-300 mb-4 leading-relaxed">
        The project is a practical example of applying software engineering concepts to a real problem in my own homelab, while building a foundation for more advanced automation and infrastructure projects.
      </p>
    `
  }
];
