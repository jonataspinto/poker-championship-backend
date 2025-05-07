export function orderPlayersRanking(players: PlayerDTO[]) {
  const ordered = players
    .sort((a, b) => (b?.podiums?.fifth ?? 0) - (a?.podiums?.fifth ?? 0))
    .sort((a, b) => (b?.podiums?.fourth ?? 0) - (a?.podiums?.fourth ?? 0))
    .sort((a, b) => (b?.podiums?.third ?? 0) - (a?.podiums?.third ?? 0))
    .sort((a, b) => (b?.podiums?.second ?? 0) - (a?.podiums?.second ?? 0))
    .sort((a, b) => (b?.podiums?.first ?? 0) - (a?.podiums?.first ?? 0))
    .sort((a, b) => (b?.points ?? 0) - (a?.points ?? 0));

  return ordered;
}
