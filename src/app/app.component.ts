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
  todo: { name: string; isEditing: boolean; priority: string; dueDate: string | null }[] = [];
  inProgress: { name: string; isEditing: boolean; priority: string; dueDate: string | null }[] = [];
  done: { name: string; isEditing: boolean; priority: string; dueDate: string | null }[] = [];
  newTask: { name: string; priority: string; dueDate: string | null } = { name: '', priority: 'low', dueDate: null };

  constructor() {}

  drop(event: CdkDragDrop<{ name: string; isEditing: boolean; priority: string; dueDate: string | null }[]>) {
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
    if (this.newTask.name.trim()) {
      this.todo.push({
        name: this.newTask.name.trim(),
        isEditing: false,
        priority: this.newTask.priority,
        dueDate: this.newTask.dueDate,
      });
      this.newTask = { name: '', priority: 'low', dueDate: null }; // Reset the new task
    }
  }

  // Deletes a task from a list based on the index
  deleteTask(list: { name: string; isEditing: boolean; priority: string; dueDate: string | null }[], index: number) {
    list.splice(index, 1);
  }

  // Starts editing a task
  editTask(task: { name: string; isEditing: boolean; priority: string; dueDate: string | null }) {
    task.isEditing = true;
  }

  // Saves the edited task
  saveTask(task: { name: string; isEditing: boolean; priority: string; dueDate: string | null }, newTaskName: string) {
    task.name = newTaskName;
    task.isEditing = false;
  }

  // Cancels editing
  cancelEdit(task: { name: string; isEditing: boolean; priority: string; dueDate: string | null }) {
    task.isEditing = false;
  }

  // Adjust the height of the textarea dynamically
  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height based on content
  }
}
