import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit(): void {
    emailjs.init('oZ1vC1bNptskKWnSn');
    this.activeRoute.fragment.subscribe(section => {
      if (section !== null) {
        window.document.getElementById(section)?.scrollIntoView();
      }
    });
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: [null, [Validators.required]]
    })
  }

  get fullName() { return this.form.get('fullName') }

  get email() { return this.form.get('email') }

  get message() { return this.form.get('message') }

  openCvFile() {
    let link = document.createElement("a");
    link.download = "CV2023.pdf";
    link.href = "assets/files/CV2023.pdf";
    link.click();
  }

  sendEmail(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    emailjs
      .send('service_yxffw0w', 'template_iknn7x9', {
        from_name: this.fullName?.value, mail: this.email?.value, message: this.message?.value
      }, {
        publicKey: 'oZ1vC1bNptskKWnSn',
      })
      .then(
        () => {
          this.isLoading = false;
          console.log('SUCCESS!');
          this.form.reset();
          this.form.setValue({
            fullName: '',
            email: '',
            message: ''
          })

        },
        (error) => {
          this.isLoading = false;
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}
