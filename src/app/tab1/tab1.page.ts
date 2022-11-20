import { Component, OnInit } from "@angular/core";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  public orders: Array<any> = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const ordersDb = collection(this.firestore, "orders");
    const q = query(ordersDb, where("assignedDelivery", "==", "Available"));

    getDocs(ordersDb).then((res) => {
      this.orders = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      console.log(this.orders);
    });
  }
}
