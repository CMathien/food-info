import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  champSaisieCodeBarres = new FormControl('');

  //Dissimulation de l'affichage des informations
  estAffiche = false;

  //Déclaration des variables des titres de bloc
  public monTitre: string;
  public monSousTitre: string;
  public titreIngredients: any;
  public titreAllergenes: any;
  public titreValeursNutritionnelles: any;
  public titreConditionnement: any;
  public titreLieuFabrication: any;
  public titreListeLabels: any;
  public titrePays: any;
  public titreCategorie: any;
  public copyright: string;

  //Déclaration du code-barres
  public codeARechercher: any;

  //Déclaration des variables à rechercher dans l'API
  public statutProduit: any;
  public nomProduit: any;
  public codeBarresProduit: any;
  public marqueProduit: any;
  public sourceImageProduit: any;
  public ingredientsProduit: any;
  public energieProduit: any;
  public matieresGrassesProduit: any;
  public acidesGrasSaturesProduit: any;
  public glucidesProduit: any;
  public sucresProduit: any;
  public fibresAlimentairesProduit: any;
  public proteinesProduit: any;
  public selProduit: any;
  public sodiumProduit: any;
  public allergenes: any;
  public conditionnementProduit: any;
  public lieuFabricationProduit: any;
  public sourceImageNova: any;
  public sourceImageNutriscore: any;
  public sourceImageHuileDePalme: any;
  public listeLabelsProduit: any;
  public paysProduit: any;
  public categorieProduit: any;

  constructor(private http: HttpClient) {
    this.monTitre = 'Myuka';
    this.monSousTitre =
      'Obtenez des informations sur les produits alimentaires !';
    this.copyright =
      'Cette application web est basée sur une API REST diffusée par le site Open Food Facts.';
  }

  ngOnInit(): void {}

  public rechercherCodeBarres() {
    //Récupération du code-barres saisi
    this.codeARechercher = this.champSaisieCodeBarres.value;

    //Définition des titres
    this.titreIngredients = 'Ingrédients';
    this.titreAllergenes = 'Allergènes';
    this.titreValeursNutritionnelles = 'Valeurs nutritionnelles';
    this.titreConditionnement = 'Conditionnement';
    this.titreLieuFabrication = 'Lieu de fabrication';
    this.titreListeLabels = 'Labels';
    this.titrePays = 'Pays';
    this.titreCategorie = 'Catégorie de produit';

    return this.http
      .get(
        'https://world.openfoodfacts.org/api/v0/product/' +
          this.codeARechercher +
          '.json'
      )
      .subscribe((data: any) => {
        this.statutProduit = data['status'];

        //Vérification de l'existence du produit dans Open Food Facts
        if (this.statutProduit == 0) {
          this.estAffiche = false;
          this.nomProduit = 'Produit introuvable.';
          this.codeBarresProduit =
            'Veuillez vérifier que le code-barres saisi est correct.';
          this.marqueProduit =
            "Il se peut également que le produit n'ait pas encore été ajouté à la base de données Open Food Facts.";
        } else {
          //Ouverture de l'affichage des données et récupération des données
          this.estAffiche = true;
          (this.nomProduit = data['product']['product_name_fr']),
            (this.codeBarresProduit = 'Code-barres : ' + data['code']),
            (this.marqueProduit = 'Marque : ' + data['product']['brands']),
            (this.sourceImageProduit =
              data['product']['image_front_small_url']),
            (this.ingredientsProduit =
              data['product']['ingredients_text_with_allergens_fr']),
            (this.energieProduit =
              data['product']['nutriments']['energy-kcal_100g'] + ' kcal'),
            (this.matieresGrassesProduit =
              data['product']['nutriments']['fat_100g'] + ' g'),
            (this.acidesGrasSaturesProduit =
              data['product']['nutriments']['saturated-fat_100g'] + ' g'),
            (this.glucidesProduit =
              data['product']['nutriments']['carbohydrates_100g'] + ' g'),
            (this.sucresProduit =
              data['product']['nutriments']['sugars_100g'] + ' g'),
            (this.fibresAlimentairesProduit =
              data['product']['nutriments']['fiber_100g'] + ' g'),
            (this.proteinesProduit =
              data['product']['nutriments']['proteins_100g'] + ' g'),
            (this.selProduit =
              data['product']['nutriments']['salt_100g'] + ' g'),
            (this.sodiumProduit =
              data['product']['nutriments']['sodium_100g'] + ' g'),
            (this.allergenes = data['product']['allergens']),
            (this.conditionnementProduit = data['product']['packaging']),
            (this.lieuFabricationProduit =
              data['product']['manufacturing_places']),
            (this.sourceImageNova = data['product']['nova_group']),
            (this.sourceImageNutriscore = data['product']['nutriscore_grade']),
            (this.sourceImageHuileDePalme =
              data['product']['ingredients_from_palm_oil_n']),
            (this.listeLabelsProduit = data['product']['labels']),
            (this.paysProduit = data['product']['countries']),
            (this.categorieProduit = data['product']['categories']);
        }
      });
  }
}
