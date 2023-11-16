interface IPlayer {
  name: string;
  email: string;
  id: string;
  displayName?: string;
  dateBirth?: Date | string;
  photoURL?: string;
  address?: IAddress;
  points?: number;
  isAdmin?: boolean
}
