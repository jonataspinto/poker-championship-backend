interface Player {
  name: string;
  email: string;
  displayName?: string;
  dateBirth?: Date | string;
  photoURL?: string;
  address?: IAddress;
  points?: number;
  isAdmin?: boolean;
  podiums?: PlayerPodium;
}

interface PlayerDTO extends Player {
  id: string;
  podiums: PlayerPodium;
}
