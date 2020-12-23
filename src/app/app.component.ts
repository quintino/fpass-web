import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CharacterService} from './services/character.service';
import {Character} from './entities/character';
import {Result} from './entities/result';
import {MatDialog} from '@angular/material/dialog';
import {CharacterDialogComponent} from './character-dialog/character-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private testList = false;
  public form: FormGroup;
  public value: FormControl;
  character: Character;

  constructor(private service: CharacterService, private dialog: MatDialog) {
  }

  ngOnInit(): any {
    this.value = new FormControl('');
    this.form = new FormGroup({
      value: this.value,
    });
    if (this.testList) {
      this.character = new Character();
      const result = new Result();
      result.name = 'test';
      result.description = 'description test';
      result.thumbnail.path = 'https://oficinahq.files.wordpress.com/2011/04/marcel.jpg';
      this.character.data.results.push(result);
    }
  }

  search(): any {
    this.service.get(this.value.value).subscribe(result => {
      this.character = result;
    });
  }

  detail(item: Result): any {
    this.dialog.open(CharacterDialogComponent, {
      width: '40vw',
      data: item
    });
  }
}
