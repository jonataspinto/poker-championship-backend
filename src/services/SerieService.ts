import { PlayerSchema, Serie } from "../models";

class SerieService {
  data: Serie = {
    category: "",
    players: [],
  };

  constructor() {
    this.data.players = [];
  }

  private async fetchPlayers(_category: string = "A") {
    const result = await PlayerSchema.find({ serie: _category.toUpperCase() });
    this.data.category = _category.toUpperCase();
    this.data.players = result;
    return this.data;
  }

  fetch(category: string) {
    return this.fetchPlayers(category);
  }
}

export default SerieService;
