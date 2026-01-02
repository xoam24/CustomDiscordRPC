export interface RpcButton {
  label: string;
  url: string;
}

export interface RpcConfig {
  details: string;
  state: string;
  largeImageKey: string;
  largeImageText: string;
  smallImageKey: string;
  smallImageText: string;
  showElapsedTime: boolean;
  buttonsEnabled: boolean;
  buttons: RpcButton[];
  startTimestamp?: number;
}

export interface RpcPreset {
  id: string;
  name: string;
  config: RpcConfig;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export const defaultRpcConfig: RpcConfig = {
  details: "Playing a game",
  state: "In the main menu",
  largeImageKey: "game_logo",
  largeImageText: "Game Logo",
  smallImageKey: "status_online",
  smallImageText: "Online",
  showElapsedTime: true,
  buttonsEnabled: false,
  buttons: [
    { label: "Join Game", url: "https://example.com" },
    { label: "Website", url: "https://example.com" },
  ],
  startTimestamp: Date.now(),
};

export const imageKeyOptions = [
  { value: "game_logo", label: "Game Logo" },
  { value: "status_online", label: "Status Online" },
  { value: "status_idle", label: "Status Idle" },
  { value: "status_dnd", label: "Status DND" },
  { value: "custom_1", label: "Custom 1" },
  { value: "custom_2", label: "Custom 2" },
];
