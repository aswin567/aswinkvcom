import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { WorkExperince } from '../interface/work-experince';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  slectedworkExperinces: WorkExperince;
  constructor(private appService: AppService, private route: ActivatedRoute, private location: Location) {
    this.onGetWorkExperince();
  }

  ngOnInit(): void {
  }

  onGetWorkExperince() {
    this.appService.getWorkExperince().subscribe((res: Array<WorkExperince>) => {
      const id = Number(this.route.snapshot.paramMap.get('companyId'));
      this.slectedworkExperinces = res.find((company: WorkExperince) => company.id === id);
    });
  }

  goBack(){
    this.location.back();
  }
}
