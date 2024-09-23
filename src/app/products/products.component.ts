import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface ProductData {
  id: string;
  nom: any;
  image: any;
  prix: any;
  sid: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  getProduct: Subscription = new Subscription();
  Sid: any;
  productDataArray: {
    id: string;
    nom: any;
    image: any;
    prix: any;
    sid: string;
  }[] = [];
  selectedSubCategory: any;
  subCatName: any;

  constructor(private route: ActivatedRoute, private fs: AngularFirestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.Sid = params.get('sid');
      this.subCatName = params.get('nom');
      this.getProduct = this.fs
        .collection('Products', (ref) => ref.where('sid', '==', this.Sid))
        .snapshotChanges()
        .subscribe((data) => {
          this.productDataArray = data.map((element) => {
            const docData = element.payload.doc.data() as ProductData;
            return {
              id: element.payload.doc.id,
              nom: docData.nom,
              image: docData.image,
              prix: docData.prix,
              sid: docData.sid,
            };
          });
        });
    });
  }

  // selectSubCategory(subcategory: any) {
  //   this.selectedSubCategory = subcategory;
  //   this.Sid = subcategory.id;
  // }
  // getFilteredProducts() {
  //   return this.productDataArray.filter((product) => product.sid === this.Sid);
  // }
}
