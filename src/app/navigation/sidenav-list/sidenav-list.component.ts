import { Component, OnInit ,EventEmitter,Output,OnDestroy} from '@angular/core';
import { from } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  isAuth=false;
  authSubscription : Subscription;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor( private authservice: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authservice.authChange.subscribe( navauthstatus => {
      this.isAuth = navauthstatus;
    });
  }

  onClose(){
   this.closeSidenav.emit();
  }

  onLogout(){
    this.onClose();
    this.authservice.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
