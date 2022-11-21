import { Component, OnInit } from "@angular/core";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "@angular/fire/auth";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { collection, addDoc, Firestore } from "@angular/fire/firestore";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from "@angular/fire/storage";
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
  public address: string = "";
  public contact: string = "";
  public firstName: string = "";
  public username: string = "";

  public franchiseUrl: string = "";
  public imageUrl: string = "";
  public lastName: string = "";
  public middleName: string = "";
  public type: string = "";
  public email: string = "";
  public password: string = "";
  public cpassword: string = "";

  public fileImage: string;
  fileRestriction: Array<any> = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];
  fileRestrictionImage: Array<any> = ["image/jpeg", "image/png"];
  isFileValid: boolean = true;
  file!: File;

  constructor(
    private toast: ToastController,
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  ngOnInit() {}

  fileChangeDocuments(event: any) {
    console.log(event.target.files[0]);
    if (this.fileRestriction.includes(event.target.files[0].type)) {
      this.file = event.target.files[0];
      this.isFileValid = true;
    } else {
      this.isFileValid = false;
    }
  }

  fileChangeImages(event: any) {
    console.log(event.target.files[0]);
    if (this.fileRestrictionImage.includes(event.target.files[0].type)) {
      this.fileImage = event.target.files[0];
      this.isFileValid = true;
    } else {
      this.isFileValid = false;
    }
  }

  uploadFile(event: any) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `documents/${file}`);
    const upload = uploadBytesResumable(storageRef, this.file);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);

        if (progress === 100) {
          setTimeout(() => {
            getDownloadURL(upload.snapshot.ref).then((url) => {});
          }, 2000);
        }
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((url) => {
          console.log("dlurl", url);
        });
      }
    );
  }

  signUp() {
    const dbinstance = collection(this.firestore, "users");
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((res) => {
        updateProfile(this.auth.currentUser, {
          displayName: this.firstName,
        }).catch((err) => {
          console.log(err);
        });
        let data = {
          address: this.address,
          email: this.email,
          password: this.password,
          location: this.address,
          username: this.username,

          contact: this.contact,
          firstName: this.firstName,
          franchiseUrl: this.franchiseUrl,
          imageUrl: this.imageUrl,
          lastName: this.lastName,
          middleName: this.middleName,
          type: "delivery",
        };

        console.log(data);
        addDoc(dbinstance, data)
          .then((res) => {
            this.toast
              .create({
                message: "User Created Successfully",
                duration: 3000,
                color: "success",
              })
              .then((res) => {
                res.present();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                this.router.navigate(["/login"]);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        this.router.navigate(["/login"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showPass(password, confirm) {
    password.type = password.type === "password" ? "text" : "password";
    confirm.type = confirm.type === "password" ? "text" : "password";
  }
}
