export interface Organizer {
  id: number;
  name: string;
  email: string;
  position: string;
  image: string;
}

export interface Speaker {
  id: number;
  name: string;
  image: string;
  university: string;
  topic: string;
  description?: string;
  thunder?: string;
  hIndex: number;
}
