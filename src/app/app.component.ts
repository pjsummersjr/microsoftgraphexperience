import { Component, OnInit } from '@angular/core';
import { Document } from './doclist/document';
import { Router } from '@angular/router';
import { MatTabsModule, MatToolbarModule } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Microsoft Cloud Sample';
  constructor(private router: Router) {}

  ngOnInit(): void {

  }
}
