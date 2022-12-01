import { Component, OnInit } from "@angular/core";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.page.html",
  styleUrls: ["./view-order.page.scss"],
})
export class ViewOrderPage implements OnInit {
  public order: any;
  public getUserData: any;

  public status: string = "";
  paramsId: string;
  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController
  ) {
    this.paramsId = this.activatedRoute.snapshot.params["id"];
    this.getUserData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    if (!this.paramsId) return;

    const ordersDb = doc(this.firestore, "orders/", this.paramsId);

    getDoc(ordersDb).then((res) => {
      this.order = res.data();
      this.status = this.order.order_status;
    });

    this.getOrder();
  }

  getOrder(): void {}

  statusOnChange(value: any, row: any) {
    console.log(value, row);

    const ordersDb = doc(this.firestore, "orders/", row);

    const data = {
      order_status: value,
    };
    updateDoc(ordersDb, data)
      .then((res) => {
        console.log("Okay");

        this.toast
          .create({
            message: `Status updated to <strong style="text-transform:capitalize;"> ${value}</strong>`,
            duration: 3000,
            color: "success",
          })
          .then((res) => {
            res.present();
            this.ngOnInit();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err, err.code);
      });
  }
}
