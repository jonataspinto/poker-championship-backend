interface IPlayer {
  name: string;
  email: string;
  displayName?: string;
  dateBirth?: Date | string;
  photoURL?: string;
  address?: IAddress;
  points?: number;
  isAdmin?: boolean;
  podiums: IPlayerPodium;
}

interface IPlayerDTO extends IPlayer {
  id: string;
  podiums: IPlayerPodium;
}
