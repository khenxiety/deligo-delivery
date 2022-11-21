import { Component } from "@angular/core";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { ActionSheetController } from "@ionic/angular";
import { UserPhoto, PhotoService } from "../services/photo.service";

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

  // public async showActionSheet(photo: UserPhoto, position: number) {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Photos',
  //     buttons: [{
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         this.photoService.deletePicture(photo, position);
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         // Nothing to do, action sheet is automatically closed
  //        }
  //     }]
  //   });
  //   await actionSheet.present();
  // }
}
