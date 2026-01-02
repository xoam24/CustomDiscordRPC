import { useState } from "react";
import { Settings, Image, Link2, Clock, Zap, Save, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RpcConfig, imageKeyOptions } from "@/types/rpc";
import { useUpdatePresence } from "@/hooks/useRpcApi";
import { toast } from "@/hooks/use-toast";

interface ConfigPanelProps {
  config: RpcConfig;
  onChange: (config: RpcConfig) => void;
}

export function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  const updatePresence = useUpdatePresence();

  const updateField = <K extends keyof RpcConfig>(
    field: K,
    value: RpcConfig[K]
  ) => {
    onChange({ ...config, [field]: value });
  };

  const updateButton = (index: number, field: "label" | "url", value: string) => {
    const newButtons = [...config.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    onChange({ ...config, buttons: newButtons });
  };

  const handleSavePreset = () => {
    const presets = JSON.parse(localStorage.getItem("rpc-presets") || "[]");
    const name = prompt("Enter preset name:");
    if (name) {
      presets.push({ id: Date.now().toString(), name, config });
      localStorage.setItem("rpc-presets", JSON.stringify(presets));
      toast({
        title: "Preset Saved",
        description: `"${name}" has been saved to your presets.`,
      });
    }
  };

  const handleLoadPreset = () => {
    const presets = JSON.parse(localStorage.getItem("rpc-presets") || "[]");
    if (presets.length === 0) {
      toast({
        title: "No Presets",
        description: "You haven't saved any presets yet.",
        variant: "destructive",
      });
      return;
    }
    const names = presets.map((p: any, i: number) => `${i + 1}. ${p.name}`).join("\n");
    const selection = prompt(`Select preset:\n${names}\n\nEnter number:`);
    if (selection) {
      const index = parseInt(selection) - 1;
      if (presets[index]) {
        onChange(presets[index].config);
        toast({
          title: "Preset Loaded",
          description: `"${presets[index].name}" has been loaded.`,
        });
      }
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-border/30">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
          <p className="text-xs text-muted-foreground">Customize your presence</p>
        </div>
      </div>

      {/* Details & State */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <Zap className="w-4 h-4 text-primary" />
          Activity Info
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="details" className="text-xs text-muted-foreground">
              Details
            </Label>
            <Input
              id="details"
              placeholder="What are you doing?"
              value={config.details}
              onChange={(e) => updateField("details", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-xs text-muted-foreground">
              State
            </Label>
            <Input
              id="state"
              placeholder="Current state..."
              value={config.state}
              onChange={(e) => updateField("state", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Assets */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <Image className="w-4 h-4 text-primary" />
          Assets
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Large Image</Label>
            <Select
              value={config.largeImageKey}
              onValueChange={(v) => updateField("largeImageKey", v)}
            >
              <SelectTrigger className="bg-input/60 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {imageKeyOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Small Image</Label>
            <Select
              value={config.smallImageKey}
              onValueChange={(v) => updateField("smallImageKey", v)}
            >
              <SelectTrigger className="bg-input/60 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {imageKeyOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Large Tooltip</Label>
            <Input
              placeholder="Hover text..."
              value={config.largeImageText}
              onChange={(e) => updateField("largeImageText", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Small Tooltip</Label>
            <Input
              placeholder="Hover text..."
              value={config.smallImageText}
              onChange={(e) => updateField("smallImageText", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Link2 className="w-4 h-4 text-primary" />
            Buttons
          </div>
          <Switch
            checked={config.buttonsEnabled}
            onCheckedChange={(v) => updateField("buttonsEnabled", v)}
          />
        </div>
        {config.buttonsEnabled && (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
            {config.buttons.map((btn, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder={`Button ${i + 1} Label`}
                  value={btn.label}
                  onChange={(e) => updateButton(i, "label", e.target.value)}
                />
                <Input
                  placeholder="https://..."
                  value={btn.url}
                  onChange={(e) => updateButton(i, "url", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Clock className="w-4 h-4 text-primary" />
            Show Elapsed Time
          </div>
          <Switch
            checked={config.showElapsedTime}
            onCheckedChange={(v) => updateField("showElapsedTime", v)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 space-y-3 border-t border-border/30">
        <Button
          variant="neon"
          className="w-full"
          onClick={() => updatePresence.mutate(config)}
          disabled={updatePresence.isPending}
        >
          {updatePresence.isPending ? (
            <span className="animate-pulse">Updating...</span>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Update Presence
            </>
          )}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="glass" onClick={handleSavePreset}>
            <Save className="w-4 h-4" />
            Save Preset
          </Button>
          <Button variant="glass" onClick={handleLoadPreset}>
            <FolderOpen className="w-4 h-4" />
            Load Preset
          </Button>
        </div>
      </div>
    </div>
  );
}
