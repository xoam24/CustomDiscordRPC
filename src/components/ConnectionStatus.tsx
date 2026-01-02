import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { useConnectionStatus } from "@/hooks/useRpcApi";
import { cn } from "@/lib/utils";

export function ConnectionStatus() {
  const { data: isConnected, isLoading } = useConnectionStatus();

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
        isLoading && "bg-muted/50 text-muted-foreground",
        isConnected && "bg-emerald-500/20 text-emerald-400 neon-border border-emerald-500/30",
        !isConnected && !isLoading && "bg-destructive/20 text-destructive"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : isConnected ? (
        <>
          <Wifi className="w-3 h-3" />
          <span>.NET Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Disconnected</span>
        </>
      )}
    </div>
  );
}
