import { useState, useEffect } from "react";
import { User, ExternalLink } from "lucide-react";
import { RpcConfig } from "@/types/rpc";
import { cn } from "@/lib/utils";

interface DiscordPreviewProps {
  config: RpcConfig;
}

function formatElapsedTime(startTimestamp?: number): string {
  if (!startTimestamp) return "00:00 elapsed";
  const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`;
}

export function DiscordPreview({ config }: DiscordPreviewProps) {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (!config.showElapsedTime) return;
    
    const updateTime = () => {
      setElapsedTime(formatElapsedTime(config.startTimestamp));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [config.showElapsedTime, config.startTimestamp]);

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 pb-4 border-b border-border/30">
        <div className="p-2 rounded-lg bg-discord-bg/20">
          <User className="w-5 h-5 text-discord-bg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
          <p className="text-xs text-muted-foreground">Discord User Card</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-sm">
          {/* Discord Card */}
          <div className="relative bg-discord-darker rounded-xl overflow-hidden border border-white/5 shadow-2xl animate-float">
            {/* Banner */}
            <div className="h-16 bg-gradient-to-r from-discord-bg to-indigo-500" />

            {/* Avatar Section */}
            <div className="relative px-4 pb-4">
              {/* Avatar */}
              <div className="absolute -top-10 left-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-discord-dark border-4 border-discord-darker overflow-hidden ring-2 ring-primary/30 animate-pulse-glow">
                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary/60" />
                    </div>
                  </div>
                  {/* Online Status */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-discord-darker" />
                </div>
              </div>

              {/* Username */}
              <div className="pt-12 pb-3 border-b border-white/5">
                <h3 className="text-xl font-bold text-white">Username</h3>
                <p className="text-sm text-gray-400">username#0001</p>
              </div>

              {/* Activity Section */}
              <div className="pt-3 space-y-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Playing a Game
                </div>

                <div className="flex gap-3">
                  {/* Large Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-discord-dark border border-white/5 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                        <span className="text-[8px] text-primary/60 text-center px-1">
                          {config.largeImageKey}
                        </span>
                      </div>
                    </div>
                    {/* Small Image Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-discord-dark border-2 border-discord-darker flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-primary/30 flex items-center justify-center">
                        <span className="text-[4px] text-primary/60">
                          {config.smallImageKey.slice(0, 2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className="text-sm font-medium text-white truncate">
                      {config.details || "No details set"}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {config.state || "No state set"}
                    </p>
                    {config.showElapsedTime && (
                      <p className="text-sm text-gray-500">
                        {elapsedTime}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                {config.buttonsEnabled && config.buttons.some(b => b.label) && (
                  <div className="space-y-2 pt-2">
                    {config.buttons.map((btn, i) => (
                      btn.label && (
                        <button
                          key={i}
                          className={cn(
                            "w-full py-2 px-3 rounded text-sm font-medium transition-colors",
                            "bg-gray-700/50 hover:bg-gray-600/50 text-white",
                            "flex items-center justify-center gap-2"
                          )}
                        >
                          {btn.label}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
