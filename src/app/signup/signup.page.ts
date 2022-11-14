import { Component, OnInit } from "@angular/core";
// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from '@angular/fire/auth';

// import {
//   collection,
//   addDoc,
//   Firestore,
// } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  // properties
  email: any;
  name: any;
  username: any;
  password: any;
  cpass: any;
  role: any;
  location: any;

  constructor(private toast: ToastController, private router: Router) {}

  ngOnInit() {}

  clear() {
    this.email = "";
    this.name = "";
    this.username = "";
    this.password = "";
    this.cpass = "";
    this.role = "";
  }

  signUp() {
    // const dbinstance = collection(this.firestore, "users");
    // createUserWithEmailAndPassword(this.auth, this.email, this.password)
    //   .then((res) => {
    //     updateProfile(this.auth.currentUser, {
    //       displayName: this.name,
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //     let data = {
    //       email: this.email,
    //       fullname: this.name,
    //       username: this.username,
    //       location: this.location,
    //       role: this.role,
    //       uid: res.user.uid,
    //     };
    //     addDoc(dbinstance, data)
    //       .then((res) => {
    //         this.toast
    //           .create({
    //             message: "User Created Successfully",
    //             duration: 3000,
    //             color: "success",
    //           })
    //           .then((res) => {
    //             res.present();
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           })
    //           .finally(() => {
    //             this.router.navigate(["/login"]);
    //           });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     this.router.navigate(["/login"]);
    //     this.clear();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.clear();
    //   });
  }

  showPass(password, confirm) {
    password.type = password.type === "password" ? "text" : "password";
    confirm.type = confirm.type === "password" ? "text" : "password";
  }
}
