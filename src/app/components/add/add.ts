import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProvidersService } from '../../services/providers-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
      title: [this.data.title, Validators.required],
      reference: [this.data.reference, Validators.required],
      category: [this.data.category, Validators.required],
      location: [this.data.location, Validators.required],
      status: [this.data.status, Validators.required]
    });
  }

    add(item: any) {    
    if (this.form.valid) {
      this.serv.create(item).subscribe((el: any) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      })
    }else{
      this.servererror = true;
      alert('Veuillez remplir tous les champs du formulaire avant de soumettre.');
    }
  }
}
