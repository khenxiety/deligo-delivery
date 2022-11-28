import { Component } from "@angular/core";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  orders: Array<any> = [];
  userProfile: any;

  constructor(private firestore: Firestore) {
    let data = JSON.parse(localStorage.getItem("user"));

    this.userProfile = data;
    console.log(this.userProfile);
  }

  ngOnInit() {
    const ordersDb = collection(this.firestore, "orders");
    const q = query(
      ordersDb,
      where("assignedDelivery", "==", this.userProfile.userData.email)
    );

    getDocs(q).then((res) => {
      this.orders = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }
}
