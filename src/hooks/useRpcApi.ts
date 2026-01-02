import { useMutation, useQuery } from "@tanstack/react-query";
import { RpcConfig, ApiResponse } from "@/types/rpc";
import { toast } from "@/hooks/use-toast";

const API_BASE = "http://localhost:5000";

async function updatePresence(config: RpcConfig): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/rpc/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Details: config.details,
        State: config.state,
        LargeImageKey: config.largeImageKey,
        LargeImageText: config.largeImageText,
        SmallImageKey: config.smallImageKey,
        SmallImageText: config.smallImageText,
        ShowElapsedTime: config.showElapsedTime,
        ButtonsEnabled: config.buttonsEnabled,
        Buttons: config.buttons.map((b) => ({
          Label: b.label,
          Url: b.url,
        })),
        StartTimestamp: config.startTimestamp,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update presence");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      "Connection failed. Is the .NET application running on localhost:5000?"
    );
  }
}

async function checkConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function useUpdatePresence() {
  return useMutation({
    mutationFn: updatePresence,
    onSuccess: () => {
      toast({
        title: "Presence Updated",
        description: "Your Discord Rich Presence has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Connection Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useConnectionStatus() {
  return useQuery({
    queryKey: ["connection-status"],
    queryFn: checkConnection,
    refetchInterval: 5000,
    retry: false,
  });
}
