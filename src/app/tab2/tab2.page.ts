import { Component } from "@angular/core";
import {
  collection,
  collectionSnapshots,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

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
    this.getOrders();
  }

  getOrders() {
    const ordersDb = collection(this.firestore, "orders");
    const q = query(
      ordersDb,
      where("assignedDelivery", "==", this.userProfile.userData.email)
    );

    collectionSnapshots(q).subscribe((res) => {
      this.orders = [
        ...res.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }
}
