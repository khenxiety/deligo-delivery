import { Component, OnInit } from "@angular/core";
import { signInWithEmailAndPassword, Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;

  constructor(
    private router: Router,
    private toast: ToastController,
    private auth: Auth
  ) {}

  ngOnInit() {}
  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  clear() {
    this.email = "";
    this.password = "";
  }

  validate() {
    // console.log("validate");

    // this.router.navigate(["/dashboard"]);

    if (this.email == "" || this.password == "") {
      this.presentToast("Please fill all the fields");
      this.clear();
    } else {
      this.signIn();
    }
  }

  showPass(input) {
    input.type = input.type === "password" ? "text" : "password";
  }

  signIn() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((res) => {
        console.log(res);
        this.clear();

        localStorage.setItem(
          "user",
          JSON.stringify({
            userData: res.user.providerData[0],
            id: res.user.uid,
          })
        );

        this.router.navigate(["/dashboard"]);
        this.presentToast("Login Successful");
      })
      .catch((err) => {
        console.log(err);
        this.presentToast("Login Failed");
      });
  }
}
