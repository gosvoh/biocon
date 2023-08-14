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
  nameUrl: string;
  image: string;
  university: string;
  universityUrl: string;
  topic?: string;
  description?: string;
  thunder: string;
  thunderUrl: string;
  hIndex: number;
  speakerType: string;
}
