import { Component, OnInit } from "@angular/core";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  getUserData: any;
  email: any;
  userData: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private router: Router,
    private toast: ToastController
  ) {
    this.getUserData = JSON.parse(localStorage.getItem("user"));
    this.email = this.getUserData.userData.email;
  }
  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  ngOnInit(): void {
    const userDb = collection(this.firestore, "users");
    const q = query(userDb, where("email", "==", this.email));

    getDocs(q).then((res) => {
      this.userData = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }

  logout(): void {
    localStorage.clear();
    this.presentToast("Logout Successfully");
    this.router.navigate(["/login"]);
  }
}
