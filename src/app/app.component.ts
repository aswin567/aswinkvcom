import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Skill, Contact } from './app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Declaration

  expandMenu: boolean;
  lat = 10.4042427;
  lng = 76.2709484;
  zoom = 15;
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

  contact: Contact;
  skill: Skill;

  appMasterForm: FormGroup;

  menu: {
    about: boolean,
    skill: boolean,
    exp: boolean,
    edu: boolean,
    pf: boolean,
    contact: boolean,
  };

  constructor( private fb: FormBuilder, public matSnackBar: MatSnackBar) {
    this.createForm();
    this.onInitialize();
  }

  ngOnInit() {
    this.headerTrasparent = false;
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
    if (scrollPosition > 900) {
      this.skill = {
        html: 80,
        css: 75,
        js: 80,
        ts: 80,
        angular: 80,
        sass: 70,
        md: 70,
        bs: 70,
        git: 70,
        photoshop: 70,
        jira: 60,
        redmine: 80
      };
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
    if (scrollPosition > 1400) {
      this.exMarginTrans = true;
    }
    if (scrollPosition > 1670) {
      this.edHeaderUp = true;
    }
    if (scrollPosition > 1970) {
      this.edMarginTrans = true;
    }
    if (scrollPosition > 2600) {
      this.pfHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = false;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = true;
      this.menu.contact = false;
    }
    if (scrollPosition > 3099) {
      this.contactHeaderUp = true;
      this.menu.about = false;
      this.menu.skill = false;
      this.menu.exp = false;
      this.menu.edu = false;
      this.menu.pf = false;
      this.menu.contact = true;
    }
  }


  createForm() {
    this.appMasterForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });

  }
  onScroll(value) {
    console.log(value);
  }
  onInitialize() {
    this.skill = {
      html: 0,
      css: 0,
      js: 0,
      ts: 0,
      angular: 0,
      sass: 0,
      md: 0,
      bs: 0,
      git: 0,
      photoshop: 0,
      jira: 0,
      redmine: 0
    };
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

    const timeoutIde = setTimeout(() => {
      this.matSnackBar.open('Message send sucessfully', 'Ok', {
        duration: 5000
      });
    this.appMasterForm.reset();
    }, 300);
  }
  about() {
    window.scrollTo(0, 0);
  }
}
