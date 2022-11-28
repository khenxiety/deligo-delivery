import { Component, OnInit } from "@angular/core";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.page.html",
  styleUrls: ["./view-order.page.scss"],
})
export class ViewOrderPage implements OnInit {
  public order: any;
  public getUserData: any;

  paramsId: string;
  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsId = this.activatedRoute.snapshot.params["id"];
    this.getUserData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    if (!this.paramsId) return;

    const ordersDb = doc(this.firestore, "orders/", this.paramsId);

    getDoc(ordersDb).then((res) => {
      this.order = res.data();
    });

    this.getOrder();
  }

  getOrder(): void {}
}
