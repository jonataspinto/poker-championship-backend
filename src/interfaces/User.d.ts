interface IUser {
  id?: string;
  uuid: string;
  name: string;
  displayName?: string;
  dateBirth?: Date | string;
  email: string;
  photoURL?: string;
  address?: IAddress;
  points?: number;
  isAdmin?: boolean
}

interface IUserWithPodium extends IUser {
  podiums: IPlayerPodium;
}
