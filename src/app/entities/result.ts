import {Thumbnail} from './thumbnail';

export class Result {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls = [];
  thumbnail: Thumbnail;
  comics = [];
  stories = [];
  events = [];
  series = [];

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.modified = '';
    this.resourceURI = '';
    this.thumbnail = new Thumbnail();
  }
}
