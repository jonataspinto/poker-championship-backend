export class PlayerMapper {
  static toDomain(player: any): PlayerDTO {
    return {
      id: player?.id,
      name: player?.name,
      email: player?.email,
      displayName: player?.displayName,
      dateBirth: player?.dateBirth,
      photoURL: player?.photoURL,
      points: player?.points || 0,
      isAdmin: player?.isAdmin,
      // address: player?.address,
      podiums: {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
        ...player?.podiums
      }
    };
  }

  static toPersistence(player: Player) {
    return {
      name: player?.name,
      email: player?.email,
      displayName: player?.displayName,
      dateBirth: player?.dateBirth,
      photoURL: player?.photoURL,
      // address: player?.address,
      points: player?.points,
      isAdmin: player?.isAdmin,
      podiums: player?.podiums
    };
  }
}
