import { Component, OnInit } from '@angular/core';
import { RegraService } from 'src/services/domain/regra.service';
import { Bloco } from 'src/models/Bloco.dto';

@Component({
  selector: 'rv-consulta-regra',
  templateUrl: './consulta-regra.component.html',
  styleUrls: ['./consulta-regra.component.css']
})
export class ConsultaRegraComponent implements OnInit {

  constructor(private regraService: RegraService) { }

  blocoRegra: Bloco[] = []

  ngOnInit() {
    this.regraService.getAll().subscribe(bloco =>{
      this.blocoRegra = bloco
    })
  }

}
