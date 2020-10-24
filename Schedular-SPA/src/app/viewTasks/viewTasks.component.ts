import { Pagination } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { UpdateTaskComponent } from '../updateTask/updateTask.component';
import { MatDialog } from '@angular/material/dialog';
import { StateStorageService } from '../_services/stateStorage.service';
import { AddTaskComponent } from '../addTask/addTask.component';

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewTasks.component.html',
  styleUrls: ['./viewTasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  profileForm: FormGroup;
  userAuthorised: boolean;
  currentUser;
  role;
  UserMemberModels;
  isDataAvailable: boolean;
  selectedbutton;
  taskScheduleData;
  notesArray;
  currentStartTimeDate;
  currentEndTimeDate;
  currentUserId;
  openCloseValue: boolean;
  searchTask: FormControl;

  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;

  allButtonToggle: boolean;
  openButtonToggle: boolean;
  closeButtonToggle: boolean;

  constructor(
    private taskScheduleService: TaskScheduleService,
    private stateStorageService: StateStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      this.openCloseTasks(false);
    }

  ngOnInit() {
    this.isDataAvailable = false;
    this.openCloseValue = false;
    this.searchTask = new FormControl();
    this.selectedbutton = 'Open Tasks';
  }

  openClosebutton(isClosed: boolean) {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked

    if (isClosed === false) {
      this.selectedbutton = 'Open Tasks';
      // button disable toggle
      this.allButtonToggle = false;
      this.openButtonToggle = true;
      this.closeButtonToggle = false;
      this.openCloseTasks(isClosed);
    } else {
      this.selectedbutton = 'Closed Tasks';
      // button disable toggle
      this.allButtonToggle = false;
      this.openButtonToggle = false;
      this.closeButtonToggle = true;
      this.openCloseTasks(isClosed);
    }
  }


  allTaskButton() {
    this.pagination.currentPage = 1; // reset page number back to 1 when button is clicked
    // button disable toggle
    this.allButtonToggle = true;
    this.openButtonToggle = false;
    this.closeButtonToggle = false;

    this.allTasks();
  }

  openCloseTasks(isClosed: boolean) {
      this.openCloseValue = isClosed;
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.taskScheduleService.getTaskScheduleOpenCloseByUserId
        (this.currentUser.id, isClosed, this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.taskScheduleData = data.result; // get jason data
        this.pagination = data.pagination;   // get pagination data
        this.isDataAvailable = true;
      });
  }


  pageChanged(event: any) {
    this.pageNumber = event.page;
    if (this.selectedbutton === 'Open Tasks' || this.selectedbutton === 'Closed Tasks') {
      this.openCloseTasks(this.openCloseValue);
    }
    else {
      this.allTasks();
    }

  }

  allTasks()  {
    this.selectedbutton = 'All Tasks';
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.taskScheduleService.getTaskScheduleByUserId(this.currentUser.id, this.pageNumber, this.pageSize)
    .subscribe((data) => {
      this.taskScheduleData = data.result; // get jason data
      this.pagination = data.pagination;   // get pagination data
      this.isDataAvailable = true;
    });
  }

  openDialogAddTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '80%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.allTasks();
    });
  }

  updateDialog(taskId) {
    this.stateStorageService.setTaskId(taskId);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.selectedbutton === 'All Tasks') {
        this.allTasks();
      }
      else {
        this.openCloseTasks(this.openCloseValue);
      }
    });
  }

  searchTaskBox() {
    this.stateStorageService.setTaskId(this.searchTask.value);
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '80%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.openCloseTasks(this.openCloseValue);
    });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }
}
