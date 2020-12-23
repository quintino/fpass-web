import {Result} from './result';

export class Data {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: Result[];

  constructor() {
    this.offset = '';
    this.limit = '';
    this.total = '';
    this.count = '';
    this.results = [];
  }

}
