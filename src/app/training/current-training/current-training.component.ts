import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer : number;

  constructor( private dialog:MatDialog, private trainingservice:TrainingService) { }

  ngOnInit(): void {
    this.starttimer();
  }

  starttimer(){
    const step = this.trainingservice.getRunningexercise().duration /100  * 1000;
    this.timer = setInterval( () => { 
      this.progress += 1 ; 
      if(this.progress >= 100){
        this.trainingservice.completeExercise();
        clearInterval(this.timer)
      }
    },step);
  }

  onstop(){
    clearInterval(this.timer);
    const dialogRef =this.dialog.open( StopTrainingComponent,{data: {
      progress: this.progress
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.trainingservice.cancelExercise(this.progress);
    } else {
      this.starttimer();
    }
  });
  }

}
