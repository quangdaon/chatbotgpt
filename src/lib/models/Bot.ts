export interface Bot {
  id: string;
  name: string;
  profilePicture: string;
  prompt: string;
  model?: string;
  temperature?: number;
}
