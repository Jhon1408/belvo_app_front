import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}belvo/transactions/`).pipe(map((data: any) => {
      let banks: any[] = [];
      data.data.forEach((transaction: any) => {
        let bank = banks.find((bank: any) => bank.name == transaction.account.institution.name);
        if (!bank) {
          const { account, ...transaction_info } = transaction;
          banks.push({ ...transaction.account.institution, accounts: [{ ...transaction.account, transactions: [transaction_info] }] });
        } else {
          let account = bank.accounts.find((account: any) => account.id == transaction.account.id);
          if (!account) {
            const { account, ...transaction_info } = transaction;
            bank.accounts.push({ ...transaction.account, transactions: [transaction_info] });
          } else {
            account.transactions.push(transaction);
          }
        }
      });
      return banks;
    }));
  }
}