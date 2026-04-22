import { Component, ViewChild } from '@angular/core';
import { ProvidersService } from '../../services/providers-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-my-services',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './my-services.html',
  styleUrl: './my-services.scss',
})
export class MyServices {
  displayedColumns: string[] = ['id', 'name', 'price'];
  isLoading: boolean;
  services : any = []; // Activer le chargement

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

 constructor(private prov: ProvidersService) { 
    this.isLoading = true; // Activer le chargement
    this.loadServices(); // Charger les services
    // this.prov.getAll().subscribe(el => {
    //   if (el.length) {
    //     this.services = el; // Mettre à jour la liste des services
    //     this.dataSource = new MatTableDataSource(this.services); // Initialiser la dataSource pour le tableau
    //     this.isLoading = false; // Désactiver le chargement une fois les données chargées
    //   }
    // });
  }

  loadServices() {
  this.prov.getAll().subscribe((data) => (this.services = data.reverse()));
}
}


