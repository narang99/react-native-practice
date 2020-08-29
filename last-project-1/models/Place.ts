export default class Place {
  id: string;
  title: string;
  address: string;
  imageUri: string;
  constructor(id: string, title: string, address: string, imageUri: string)  {
    this.id = id;
    this.title = title;
    this.address = address;
    this.imageUri = imageUri;
  }
}
