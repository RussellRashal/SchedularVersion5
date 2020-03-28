import { StaffMemberModel } from '../_models/StaffMemberModel';
import { TaskSchedule } from './../_models/taskSchedule';
import { Component, OnInit } from '@angular/core';
import { TaskScheduleService } from '../../app/_services/taskSchedule.service';
import { StaffMemberService } from '../_services/staffMember.service';

@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  taskSchedule: TaskSchedule[];
  staffMemberModel: StaffMemberModel[];

  constructor(
    private taskScheduleService: TaskScheduleService,
    private staffMemberService: StaffMemberService) { }

  ngOnInit() {
    this.loadUserTaskSchedule(1);
  }

    // this will load the staff members
  loadStaffSchedule() {
    this.staffMemberService.getStaffs().subscribe((staffMemberModel: StaffMemberModel[]) => {
      this.staffMemberModel = staffMemberModel;
      console.log(staffMemberModel);
    }, error => {
      console.log(error);
    });
  }


  // this will load the tasks associated with the staff members id
  loadUserTaskSchedule(id) {
    this.taskScheduleService.getTaskSchedulesByStaffId(id).subscribe((taskSchedule: TaskSchedule[]) => {
      this.taskSchedule = taskSchedule;
      console.log(taskSchedule);
    }, error => {
      console.log(error);
    });
  }

}
