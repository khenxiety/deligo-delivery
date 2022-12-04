import { Component, OnInit } from "@angular/core";
import {
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from "@angular/fire/firestore";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  public orders: Array<any> = [];

  userProfile: any;

  constructor(private firestore: Firestore) {
    let data = JSON.parse(localStorage.getItem("user"));

    this.userProfile = data;
    console.log(this.userProfile);
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const ordersDb = collection(this.firestore, "orders");
    const q = query(ordersDb, where("assignedDelivery", "==", "Available"));

    collectionSnapshots(q).subscribe((res) => {
      this.orders = [
        ...res.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      console.log(this.orders);
    });
  }

  getOrder(id: any) {
    const getOrderDb = doc(this.firestore, "orders", id);

    const data = {
      assignedDelivery: this.userProfile.userData.email,
      order_status: "to-ship",
    };

    updateDoc(getOrderDb, data).then((res) => {
      console.log(res);

      this.ngOnInit();
    });
  }
}
