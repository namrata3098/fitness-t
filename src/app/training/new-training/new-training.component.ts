import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  

  exercises: Observable<any>;
  constructor( private trainingService: TrainingService,
     private db: AngularFirestore) 
     { debugger; }

  ngOnInit() {
    debugger;
    this.exercises = this.db.collection('availableExercises').valueChanges();
    console.log("excercises",this.exercises );
  }

  ongoingtraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
