export class PlayerMapper {
  static toDomain(player: any): IPlayerDTO {
    return {
      id: player?.id,
      name: player?.name,
      email: player?.email,
      displayName: player?.displayName,
      dateBirth: player?.dateBirth,
      photoURL: player?.photoURL,
      address: player?.address,
      points: player?.points,
      isAdmin: player?.isAdmin
    };
  }

  static toPersistence(player: IPlayer) {
    return {
      name: player?.name,
      email: player?.email,
      displayName: player?.displayName,
      dateBirth: player?.dateBirth,
      photoURL: player?.photoURL,
      address: player?.address,
      points: player?.points,
      isAdmin: player?.isAdmin
    };
  }
}
