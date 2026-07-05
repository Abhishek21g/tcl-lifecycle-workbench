import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Download,
  FileCode2,
  GitBranch,
  Layers3,
  RadioTower,
  Upload,
} from "lucide-react";
import { useState } from "react";
import "./index.css";

type EventStatus = "valid" | "warning" | "error";

interface LifecycleEvent {
  id: string;
  layer: "L2" | "L3" | "L4" | "L5" | "L6";
  label: string;
  topic: string;
  schema: string;
  timestamp: string;
  correlationId: string;
  status: EventStatus;
  latency: string;
  payload: Record<string, string | number | boolean>;
  findings: string[];
}

const events: LifecycleEvent[] = [
  {
    id: "evt-tapeout-01",
    layer: "L2",
    label: "Tapeout Submitted",
    topic: "terafab.l2.tapeout.submitted",
    schema: "TapeoutSubmittedEvent",
    timestamp: "2026-03-22T13:08:00Z",
    correlationId: "trace-ai5-r10",
    status: "valid",
    latency: "seed",
    payload: { chipFamily: "AI5", revision: "r1.0", processNode: "2nm", targetWaferStarts: 25 },
    findings: ["Envelope valid", "Topic matches schema", "Correlation root detected"],
  },
  {
    id: "evt-wafer-01",
    layer: "L3",
    label: "Wafer Lot Started",
    topic: "terafab.l3.wafer.lot-started",
    schema: "WaferLotEvent",
    timestamp: "2026-03-22T13:12:30Z",
    correlationId: "trace-ai5-r10",
    status: "valid",
    latency: "+4m 30s",
    payload: { lotId: "WL-AI5-2042", waferCount: 25, chamberId: "ETCH-01", processNode: "2nm" },
    findings: ["Required lotId present", "Layer transition L2 -> L3 linked"],
  },
  {
    id: "evt-package-01",
    layer: "L4",
    label: "Package Lot Completed",
    topic: "terafab.l4.package.lot-completed",
    schema: "PackageLotEvent",
    timestamp: "2026-03-22T18:44:00Z",
    correlationId: "trace-ai5-r10",
    status: "warning",
    latency: "+5h 31m",
    payload: { packageLotId: "PKG-AI5-88", waferLotId: "WL-AI5-2042", packageType: "3D-stack", dieCount: 8200 },
    findings: ["Thermal check missing before completion", "Package lot linked to wafer lot"],
  },
  {
    id: "evt-qual-01",
    layer: "L5",
    label: "Chip Qualified",
    topic: "terafab.l5.chip.qualified",
    schema: "ChipQualificationEvent",
    timestamp: "2026-03-22T20:02:00Z",
    correlationId: "trace-ai5-r10",
    status: "valid",
    latency: "+1h 18m",
    payload: { chipId: "CHIP-AI5-0007", grade: "automotive", teopsScore: 1850, powerW: 400, qualified: true },
    findings: ["Qualification payload valid", "Grade accepted by schema"],
  },
  {
    id: "evt-fleet-01",
    layer: "L6",
    label: "Fleet Telemetry",
    topic: "terafab.l6.fleet.telemetry",
    schema: "FleetTelemetryEvent",
    timestamp: "2026-03-23T02:14:00Z",
    correlationId: "trace-ai5-r10",
    status: "error",
    latency: "+6h 12m",
    payload: { chipId: "CHIP-AI5-0007", inferenceLatencyMs: 12, powerW: 390, thermalThrottling: false },
    findings: ["Missing destination field", "Missing fsdVersion field", "Missing uptimeHours field"],
  },
];

const coverage = [
  { name: "Envelope", value: 100 },
  { name: "Topic match", value: 100 },
  { name: "Payload schema", value: 82 },
  { name: "Lifecycle links", value: 91 },
];

type ViewId = "import" | "trace" | "coverage" | "report";

const navItems: Array<{ id: ViewId; label: string; icon: typeof Upload }> = [
  { id: "import", label: "Event Import", icon: Upload },
  { id: "trace", label: "Lifecycle Trace", icon: GitBranch },
  { id: "coverage", label: "Schema Coverage", icon: FileCode2 },
  { id: "report", label: "Report", icon: ClipboardList },
];

function App() {
  const [view, setView] = useState<ViewId>("trace");
  const selected = events[4];
  const validCount = events.filter((event) => event.status === "valid").length;
  const warningCount = events.filter((event) => event.status === "warning").length;
  const errorCount = events.filter((event) => event.status === "error").length;

  return (
    <main className="app-shell">
      <aside className="nav-rail">
        <div className="brand">
          <div className="brand-mark"><Layers3 size={20} /></div>
          <div>
            <strong>TCL Workbench</strong>
            <span>Unofficial evaluator</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={view === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setView(item.id)}
                type="button"
              >
                <Icon size={17} /> {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>TCL Lifecycle Workbench</h1>
            <p>Validate a Terafab-style design-to-fleet event chain against topic, schema, and correlation rules.</p>
          </div>
          <div className="status-strip">
            <span>repo: terafab-labs/Terafab</span>
            <span>commit: 02b53ca</span>
            <strong>{validCount} valid / {warningCount} warning / {errorCount} error</strong>
          </div>
        </header>

        <section className="content-grid">
          <div className="trace-panel">
            <div className="panel-title">
              <div>
                <h2>
                  {view === "import" && "Imported Event Chain"}
                  {view === "trace" && "L2 to L6 Lifecycle Trace"}
                  {view === "coverage" && "Schema Coverage"}
                  {view === "report" && "Validation Report"}
                </h2>
                <p>
                  {view === "import" && "Seeded Terafab lifecycle events are loaded for inspection."}
                  {view === "trace" && <>Correlation ID <code>trace-ai5-r10</code></>}
                  {view === "coverage" && "Coverage across envelope, topic, payload, and lifecycle-link checks."}
                  {view === "report" && "Exportable report summary for the current event chain."}
                </p>
              </div>
              <button><Download size={16} /> Export report</button>
            </div>

            <div className="timeline">
              {events.map((event, index) => (
                <article className={`event-card ${event.status}`} key={event.id}>
                  <div className="node-row">
                    <span className="node-layer">{event.layer}</span>
                    {event.status === "valid" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  </div>
                  <h3>{event.label}</h3>
                  <p>{event.topic}</p>
                  <span className="latency">{event.latency}</span>
                  {index < events.length - 1 && <div className="connector" />}
                </article>
              ))}
            </div>

            <div className="coverage-panel">
              <h2>Schema Coverage</h2>
              <div className="coverage-grid">
                {coverage.map((item) => (
                  <div key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.value}%</strong>
                    <div className="bar"><i style={{ width: `${item.value}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="inspector">
            <div className="inspector-head">
              <RadioTower size={18} />
              <div>
                <h2>Selected Event</h2>
                <p>{selected.id}</p>
              </div>
            </div>
            <dl>
              <div><dt>Schema</dt><dd>{selected.schema}</dd></div>
              <div><dt>Topic</dt><dd>{selected.topic}</dd></div>
              <div><dt>Correlation</dt><dd>{selected.correlationId}</dd></div>
              <div><dt>Timestamp</dt><dd>{selected.timestamp}</dd></div>
            </dl>
            <h3>Validation Findings</h3>
            <ul className="findings">
              {selected.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
            <h3>Payload</h3>
            <pre>{JSON.stringify(selected.payload, null, 2)}</pre>
          </aside>
        </section>

        <footer className="report-strip">
          <span>Commands captured: <code>npm ci</code> <code>npm run build -- --force</code> <code>npm run lint -- --force</code></span>
          <button>Markdown</button>
          <button>HTML</button>
        </footer>
      </section>
    </main>
  );
}

export default App;
