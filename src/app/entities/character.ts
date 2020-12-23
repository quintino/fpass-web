import {Data} from './data';

export class Character {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;

  constructor() {
    this.code = '';
    this.status = '';
    this.copyright = '';
    this.attributionText = '';
    this.attributionHTML = '';
    this.data = new Data();
    this.etag = '';
  }
}
