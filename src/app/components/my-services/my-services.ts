import { Component, signal, ViewChild } from '@angular/core';
import { ProvidersService } from '../../services/providers-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Navbar } from './../../components/navbar/navbar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Add } from '../add/add';
import { Delete } from '../delete/delete';
import { Edit } from '../edit/edit';

@Component({
  selector: 'app-my-services',
  imports: [MatTableModule, MatSort, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, Navbar,MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './my-services.html',
  styleUrl: './my-services.scss',
})
export class MyServices {
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  // isLoading: boolean;
  services : any = []; // Activer le chargement
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search: string = '';

  constructor(private prov: ProvidersService, private dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.loadServices();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reset(){
    this.search = '';
    this.dataSource.filter = '';
  }

  add() {
    // Logique pour ajouter un nouveau service
    // alert('Ajouter un nouveau service');
    const dialogRef = this.dialog.open(Add, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadServices();
      }
    });
  }

  edit(element: any) {
    // Logique pour modifier un service existant
    // alert('Modifier un service');
    const dialogRef = this.dialog.open(Edit, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { action: 'edit', service: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadServices();
      }
    });
  }

  delete(element: any) {
    // Logique pour supprimer un service
    const dialogRef = this.dialog.open(Delete, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { action: 'delete', service: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadServices();
      }
    });
  }

  loadServices() {
    this.prov.getAll().subscribe((data: any) => {
      console.log("data", data, data.data.services);
      
      this.services = data? data.data.services.reverse(): [];
      this.dataSource = new MatTableDataSource(this.services); // Initialiser la dataSource pour le tableau
      // this.isLoading = false; // Désactiver le chargement une fois les données chargées
  });
  }
}


