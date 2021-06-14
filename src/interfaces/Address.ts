export interface IAddress {
  zipCode: number | string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}
