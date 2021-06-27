import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Contact } from '../app';
import { AppService } from '../app.service';
import { Skill } from '../interface/skill';
import { TimePeriod } from '../interface/time-period';
import { WorkExperince } from '../interface/work-experince';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './../../assets/style/main-container.scss']
})
export class HomeComponent implements OnInit {

  expandMenu: boolean;
  lat = 10.4042427;
  lng = 76.2709484;
  zoom = 15;
  age: string | number;
  experince: Observable<TimePeriod>;
  workExperinces$: Observable<Array<WorkExperince>>;
  educationDetails$: Observable<Array<WorkExperince>>;
  scrollPosition: number;
  cardUp: boolean;
  headerTrasparent: boolean;
  exMarginTrans: boolean;
  edMarginTrans: boolean;
  skillsHeaderUp: boolean;
  exHeaderUp: boolean;
  edHeaderUp: boolean;
  pfHeaderUp: boolean;
  contactHeaderUp: boolean;
  tosterActive: boolean;
  intro$: Observable<string>;
  contact: Contact;
  skills: Array<Skill>;
  initSkills: Array<Skill>;

  appMasterForm: FormGroup;

  menu: {
    about: boolean,
    skill: boolean,
    exp: boolean,
    edu: boolean,
    pf: boolean,
    contact: boolean,
  };
  constructor(private fb: FormBuilder, public matSnackBar: MatSnackBar, private appService: AppService) {
    this.createForm();
    this.onInitialize();
  }

  ngOnInit() {
    this.headerTrasparent = false;
    this.onGetWorkExperince();
    this.onGetEducationDetails();
    this.onGetSkillInitDetails();
    this.onGetIntro();
    this.findMyAge();
    this.experince = this.appService.timePeriod$;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition === 0) {
      this.headerTrasparent = true;
    } else {
      this.headerTrasparent = false;
    }
    if (scrollPosition < 500) {

      this.menu.about = true;
      this.menu.skill = false;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = false;
      this.menu.contact = false;
    }
    if (scrollPosition > 500) {
      this.skillsHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = true;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = false;
      this.menu.contact = false;

    }
    if (scrollPosition > 700) {
      this.onIntializeSkills();
    }
    if (scrollPosition > 1100) {
      this.exHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = false;
      this.menu.exp = true;
      this.menu.edu = false;
      this.menu.pf = false;
      this.menu.contact = false;
    }
    if (scrollPosition > 1450) {
      this.exMarginTrans = true;
    }
    if (scrollPosition > 2400) {
      this.edHeaderUp = true;
    }
    if (scrollPosition > 2700) {
      this.edMarginTrans = true;
    }
    if (scrollPosition > 3300) {
      this.pfHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = false;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = true;
      this.menu.contact = false;
    }
    if (scrollPosition > 3900) {
      this.contactHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = false;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = false;
      this.menu.contact = true;
    }
  }

  onGetWorkExperince() {
    this.workExperinces$ = this.appService.getWorkExperince();
  }
  onGetEducationDetails() {
    this.educationDetails$ = this.appService.getEducationDetails();
  }
  onGetSkillInitDetails() {
    this.appService.getSkillsInit().subscribe((res) => this.initSkills = res);
  }
  onGetIntro() {
    this.intro$ = this.appService.getIntro();
  }

  findMyAge() {
    const today = new Date();
    const birthDate = new Date('8/31/1993');
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    this.age = age;
  }

  getExperince(dateString) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dateNow = now.getDate();

    const dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5)
    );

    const yearDob = dob.getFullYear();
    const monthDob = dob.getMonth();
    const dateDob = dob.getDate();
    let age: any = {};
    let ageString = '';
    let yearString = '';
    let monthString = '';
    let dayString = '';


    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob) {
      var monthAge = monthNow - monthDob;
    } else {
      yearAge--;
      var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) {
      var dateAge = dateNow - dateDob;
    } else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
    };

    if (age.years > 1) { yearString = ' years'; } else { yearString = ' year'; }
    if (age.months > 1) { monthString = ' months'; } else { monthString = ' month'; }
    if (age.days > 1) { dayString = ' days'; } else { dayString = ' day'; }


    if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.years + yearString + ', ' + age.months + monthString + ', and ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) {
      ageString = 'Only ' + age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) {
      ageString = age.years + yearString;
    } else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.years + yearString + ' and ' + age.months + monthString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.months + monthString + ' and ' + age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) {
      ageString = age.years + yearString + ' and ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.months + monthString;
    } else { ageString = 'Oops! Could not calculate age!'; }

    return ageString;
  }

  onIntializeSkills() {

    this.appService.getSkills().subscribe((res) => {
      this.skills = res;
      let i = 0;
      while (i < this.skills.length) {
        this.initSkills[i].rating = this.skills[i].rating;
        i++;
      }
    });
  }
  createForm() {
    this.appMasterForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')])],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });

  }

  onScroll(value) {
    console.log(value);
  }

  onInitialize() {
    // this.skill = {
    //   html: 0,
    //   css: 0,
    //   js: 0,
    //   ts: 0,
    //   angular: 0,
    //   sass: 0,
    //   md: 0,
    //   bs: 0,
    //   git: 0,
    //   photoshop: 0,
    //   jira: 0,
    //   redmine: 0
    // };
    this.contact = {
      name: '',
      email: '',
      subject: '',
      content: '',
    };
    this.menu = {
      about: true,
      skill: false,
      exp: false,
      edu: false,
      pf: false,
      contact: false,
    };
    this.expandMenu = false;
    this.cardUp = false;
    this.headerTrasparent = false;
    this.exMarginTrans = false;
    this.edMarginTrans = false;
    this.tosterActive = false;
    this.cardAnimate();
    this.reset();
  }

  cardAnimate() {
    setTimeout(function () {
      this.cardUp = true;
    }, 1000);
  }

  onExpandMenu() {
    this.expandMenu = !this.expandMenu;
  }

  onNavigate(activeMenu) {
    switch (activeMenu) {
      case 'abt':
        this.menu.about = true;
        this.menu.skill = false;
        this.menu.exp = false;
        this.menu.edu = false;
        this.menu.pf = false;
        this.menu.contact = false;
        break;
      case 'skills':
        this.menu.about = false;
        this.menu.skill = true;
        this.menu.exp = false;
        this.menu.edu = false;
        this.menu.pf = false;
        this.menu.contact = false;
        break;
      case 'exp':
        this.menu.about = false;
        this.menu.skill = false;
        this.menu.exp = true;
        this.menu.edu = false;
        this.menu.pf = false;
        this.menu.contact = false;
        break;
      case 'pf':
        this.menu.about = false;
        this.menu.skill = false;
        this.menu.exp = false;
        this.menu.edu = false;
        this.menu.pf = true;
        this.menu.contact = false;
        break;
      case 'contact':
        this.menu.about = false;
        this.menu.skill = false;
        this.menu.exp = false;
        this.menu.edu = false;
        this.menu.pf = false;
        this.menu.contact = true;
        break;
    }
  }

  reset() {

    this.contact = {
      name: '',
      email: '',
      subject: '',
      content: ''
    };

  }

  closeToster() {
    this.tosterActive = false;
  }

  submit() {
    if (this.appMasterForm.valid) {
      this.appService.sendMail(this.appMasterForm.value).subscribe((res) => {

        this.appMasterForm.reset();
        console.log(res);
        this.matSnackBar.open('Message send sucessfully', 'Ok', {
          duration: 5000
        });
      })
    }
  }

  about() {
    window.scrollTo(0, 0);
  }
}
