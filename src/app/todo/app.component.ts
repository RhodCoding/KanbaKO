import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class AppComponent {
  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
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

  // Adds a new task to the "To do" list
  addTask() {
    if (this.newTask.trim()) {
      this.todo.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  // Deletes a task from a list based on the index
  deleteTask(list: string[], index: number) {
    list.splice(index, 1);  // Remove the task at the specified index
  }
}
