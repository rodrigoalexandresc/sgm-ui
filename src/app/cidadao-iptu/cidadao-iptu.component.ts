import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPTUService } from './cidado-iptu.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cidadao-iptu',
  templateUrl: './cidadao-iptu.component.html',
  styleUrls: ['./cidadao-iptu.component.scss'],
  providers: [IPTUService]
})
export class CidadaoIptuComponent implements OnInit {

  formConsulta: FormGroup;
  iptus: any;

  constructor(private fb: FormBuilder, private router: Router, private iptuService: IPTUService, 
    private _snackBar: MatSnackBar ) { }  

  ngOnInit(): void {
    this.formConsulta = this.fb.group({
      CPFouCNPJ: ['', Validators.required],
      InscricaoImovel: ['', Validators.required],
      DataConsulta: [new Date(), Validators.required]
    })
  }

  onSubmit() {
    this.iptus = [];

    const formData = this.formConsulta.value;
    this.iptuService.obter(formData).subscribe((data) => {
      this.iptus = data;
    },
    (respErro) => {
      let erros = "";
      respErro.error.forEach(e => {
        erros += ` ${e} `;
      });
      this._snackBar.open(erros, "", {
        duration: 2000        
      });
    });
    //this.iptus$ = this.iptuService.obter(formData);
    // console.log(`${JSON.stringify( this.formConsulta.value)}`);    
    // this.router.navigate(['/cidadao/iptu/retorno']);    
  }

}
