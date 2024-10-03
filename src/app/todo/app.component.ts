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
  todo: { name: string; isEditing: boolean }[] = [];
  inProgress: { name: string; isEditing: boolean }[] = [];
  done: { name: string; isEditing: boolean }[] = [];
  newTask: string = '';
  finalString: string;

  constructor() {
    let currentDate = new Date();
    this.finalString = currentDate.toLocaleDateString();
  }

  drop(event: CdkDragDrop<{ name: string; isEditing: boolean }[]>) {
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
      this.todo.push({ name: this.newTask.trim(), isEditing: false });
      this.newTask = '';
    }
  }

  // Deletes a task from a list based on the index
  deleteTask(list: { name: string; isEditing: boolean }[], index: number) {
    list.splice(index, 1);
  }

  // Starts editing a task
  editTask(task: { name: string; isEditing: boolean }) {
    task.isEditing = true;
  }

  // Saves the edited task
  saveTask(task: { name: string; isEditing: boolean }, newTaskName: string) {
    task.name = newTaskName;
    task.isEditing = false;
  }

  // Cancels editing
  cancelEdit(task: { name: string; isEditing: boolean }) {
    task.isEditing = false;
  }
}
