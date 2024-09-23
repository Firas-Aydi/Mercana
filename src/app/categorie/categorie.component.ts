import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface CategorieData {
  id: string;
  nom: any;
  image: any;
}
interface SousCatData {
  id: string;
  nom: any;
  image: any;
  cid: string;
}

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  getCategories: Subscription = new Subscription();
  getSousCat: Subscription = new Subscription();
  categorieDataArray: { id: string; nom: any; image: any }[] = [];
  sousCatDataArray: { id: string; nom: any; image: any; cid: string }[] = [];
  selectedCategory: any;
  Cid: string = '';
  selectedSubCategory: any;
  Sid: any;
  Snom: any;

  constructor(private fs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.getCategories = this.fs
      .collection('categorie')
      .snapshotChanges()
      .subscribe((data) => {
        console.log('categorie Data:', data); // Vérifiez si les données sont récupérées
        this.categorieDataArray = data.map((element) => {
          const docData = element.payload.doc.data() as CategorieData;
          return {
            id: element.payload.doc.id,
            nom: docData.nom,
            image: docData.image,
          };
        });
        console.log('Mapped Data:', this.categorieDataArray); // Vérifiez si les données sont correctement mappées
      });
    this.getSousCat = this.fs
      .collection('sous-catégories')
      .snapshotChanges()
      .subscribe((data) => {
        console.log('sous-catégories Data:', data); // Vérifiez si les données sont récupérées
        this.sousCatDataArray = data.map((element) => {
          const docData = element.payload.doc.data() as SousCatData;
          return {
            id: element.payload.doc.id,
            nom: docData.nom,
            image: docData.image,
            cid: docData.cid,
          };
        });
        console.log('sous-catégories Mapped Data:', this.sousCatDataArray); // Vérifiez si les données sont correctement mappées
      });
  }
  ngOnDestroy(): void {
    this.getCategories.unsubscribe();
    this.getSousCat.unsubscribe();
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.Cid = category.id;
  }
  getFilteredSousCategories() {
    return this.sousCatDataArray.filter(
      (subCategory) => subCategory.cid === this.Cid
    );
  }
  getSubCategoryGroups() {
    const subCategoryGroups = [];
    const subCategories = this.getFilteredSousCategories();
    for (let i = 0; i < subCategories.length; i += 2) {
      subCategoryGroups.push(subCategories.slice(i, i + 2));
    }
    return subCategoryGroups;
  }
  selectSubCategory(subcategory: any) {
    this.selectedSubCategory = subcategory;
    this.Sid = subcategory.id;
    this.Snom = subcategory.nom;
    this.router.navigate(['/products',this.Sid,this.Snom]);
  }
  // getFilteredProducts() {
  //   return this.productDataArray.filter((product) => product.sid === this.Sid);
  // }

  // getProductsGroups() {
  //   const productGroups = [];
  //   const products = this.getFilteredProducts();
  //   for (let i = 0; i < products.length; i += 2) {
  //     productGroups.push(products.slice(i, i + 2));
  //   }
  //   return productGroups;
  // }
}
