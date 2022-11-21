import { Component, OnInit } from "@angular/core";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  getUserData: any;

  email: any;

  userData: Array<any> = [];

  constructor(private firestore: Firestore) {
    this.getUserData = JSON.parse(localStorage.getItem("user"));
    console.log(this.getUserData);

    this.email = this.getUserData.userData.email;
    console.log(this.email);
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

      console.log(this.userData);
    });
  }
}
