interface IAddress {
  zipCode: number | string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
}

interface ILocation {
  lat: number;
  lng: number;
}
