import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost/kanban-api/index.php';

  constructor(private http: HttpClient) {}

  getTasks(status?: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${status ? '?status=' + status : ''}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl, { body: { id } });
  }
}
