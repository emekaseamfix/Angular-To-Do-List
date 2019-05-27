import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService],
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payloaf.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      //sort array isChecked false -> true
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })

    });
  }

  onAdd(itemTitle){
    this.toDoService.addTitle(itemTitle.value);
  }

  alterCheck($key: string,isChecked){
    this.toDoService.checkOrCheckTitle($key,!isChecked);
  }

  onDelete($key : string){
    this.toDoService.removeTitle($key);
  }

}
