import { Component } from "@angular/core";
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
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  orders: Array<any> = [];
  userProfile: any;

  constructor(private firestore: Firestore, private toast: ToastController) {
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

  updateStatus(value: any, row: any) {
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
