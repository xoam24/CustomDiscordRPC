import { useState } from "react";
import { Disc, Github } from "lucide-react";
import { ConfigPanel } from "@/components/ConfigPanel";
import { DiscordPreview } from "@/components/DiscordPreview";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { RpcConfig, defaultRpcConfig } from "@/types/rpc";

const Index = () => {
  const [config, setConfig] = useState<RpcConfig>({
    ...defaultRpcConfig,
    startTimestamp: Date.now(),
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 min-h-screen p-4 md:p-8 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center neon-glow">
                <Disc className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md -z-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground text-glow">
                Discord RPC Controller
              </h1>
              <p className="text-xs text-muted-foreground">
                Custom Rich Presence Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ConnectionStatus />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg glass hover:bg-glass/60 transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 grid md:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
          <ConfigPanel config={config} onChange={setConfig} />
          <DiscordPreview config={config} />
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Ensure the .NET application is running on{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted/50 text-primary font-mono">
              localhost:5000
            </code>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
