export interface BotBase {
  id: string;
  name: string;
  profilePicture: string;
}

export interface BotPreset extends BotBase {
  type: 'preset';
}

export interface BotCustom extends BotBase {
  type: 'custom';
  prompt: string;
}

export type Bot = BotPreset | BotCustom;