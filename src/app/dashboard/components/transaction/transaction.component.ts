import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public banks: any;

  constructor(private transctionService: TransactionService) { }

  ngOnInit(): void {
    this.transctionService.get().subscribe((data) => {
      this.banks = data;
      console.log(this.banks)
    });
  }

  formatBankName(name: string) {
    return name.split("_").map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  }

  formatBankType(type: string) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
