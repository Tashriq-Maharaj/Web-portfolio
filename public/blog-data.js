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
  }
];
