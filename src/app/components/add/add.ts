import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProvidersService } from '../../services/providers-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add',
  imports: [CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  form: any;
  data: any;
  servererror: boolean = false;
  constructor(public dialogRef: MatDialogRef<Add>, private fb: FormBuilder, public prov: ProvidersService, public serv: ProvidersService) { 
    this.data = {};  
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      services: [this.data.services, Validators.required],
      price: [this.data.price, Validators.required],
      start: [this.data.start, Validators.required],
      rating: [this.data.rating, Validators.required],
      address: [this.data.address, Validators.required],
      tel: [this.data.tel, Validators.required],
      email: [this.data.email, Validators.required],
      city: [this.data.city, Validators.required],
      desc: [this.data.desc, Validators.required],
      status: [this.data.status, Validators.required]
    });
  }

    add(item: any) {    
      console.log(item);

    if (this.form.valid) {

      console.log(this.form.valid, item);
      
      this.serv.create(item).subscribe((el: any) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      })
    }else{
      this.servererror = true;
      alert('Veuillez remplir tous les champs du formulaire avant de soumettre.');
    }
  }
}
