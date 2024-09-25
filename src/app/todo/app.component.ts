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
  todo: string[] = [];         // Empty To do list initially
  inProgress: string[] = [];   // Empty In Progress list initially
  done: string[] = [];         // Empty Done list initially
  newTask: string = '';        // Variable to hold the new task input

  // Handles dropping and reordering tasks
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

  // Adds a new task to the To do list
  addTask() {
    if (this.newTask.trim()) {
      this.todo.push(this.newTask.trim());  // Push new task to To do list
      this.newTask = '';  // Clear the input after adding the task
    }
  }
}
