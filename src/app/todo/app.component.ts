import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class AppComponent {
  todo = ['Task 1', 'Task 2', 'Task 3'];
  inProgress = ['Task 4'];
  done = ['Task 5'];
  newTask: string = '';

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todo.push(this.newTask.trim());
      this.newTask = '';
    }
  }
}
