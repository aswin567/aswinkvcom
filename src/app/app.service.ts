import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkExperince } from './interface/work-experince';
import { Observable } from 'rxjs';
import { Skill } from './interface/skill';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getWorkExperince(): Observable<Array<WorkExperince>>{
    return this.http.get<Array<WorkExperince>>('assets/configs/work-experince.json')
  }

  getEducationDetails(): Observable<Array<WorkExperince>>{
    return this.http.get<Array<WorkExperince>>('assets/configs/eductaion.json')
  }

  getSkills(): Observable<Array<Skill>>{
    return this.http.get<Array<Skill>>('assets/configs/skills.json');
  }

  getSkillsInit(): Observable<Array<Skill>>{
    return this.http.get<Array<Skill>>('assets/configs/skillInit.json');
  }

  getIntro(): Observable<string>{
    return this.http.get<string>('assets/configs/intro.json');
  }
}
