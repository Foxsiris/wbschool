interface Account {
    accountNumber: string;
    balance: number;
    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): number;
    applyMonthlyFee(): void;
    applyInterest(): void;
  }
  
  class DebitAccount implements Account {
    accountNumber: string;
    balance: number;
    monthlyFee: number = 50;
    interestRate: number = 0.05;
    constructor(accountNumber: string, initialBalance: number = 0) {
      this.accountNumber = accountNumber;
      this.balance = initialBalance;
    }
  
    deposit(amount: number): void {
      if (amount <= 0) {
        console.log("Сумма пополнения должна быть положительной.");
        return;
      }
      this.balance += amount;
      console.log(`Пополнение дебетового счета ${this.accountNumber} на сумму ${amount}. Баланс: ${this.balance}`);
    }
  
    withdraw(amount: number): void {
      if (amount <= 0) {
        console.log("Сумма снятия должна быть положительной.");
        return;
      }
      if (amount > this.balance) {
        console.log("Недостаточно средств на дебетовом счете.");
        return;
      }
      this.balance -= amount;
      console.log(`Снятие с дебетового счета ${this.accountNumber} на сумму ${amount}. Баланс: ${this.balance}`);
    }
  
    checkBalance(): number {
      console.log(`Баланс дебетового счета ${this.accountNumber}: ${this.balance}`);
      return this.balance;
    }
  
    applyMonthlyFee(): void {
      if (this.balance >= this.monthlyFee) {
        this.balance -= this.monthlyFee;
        console.log(`Списание платы за обслуживание счета ${this.accountNumber}: ${this.monthlyFee}. Баланс: ${this.balance}`);
      } else {
        console.log(`Недостаточно средств для списания платы за обслуживание счета ${this.accountNumber}`);
      }
    }
  
    applyInterest(): void {
      const interest = this.balance * this.interestRate / 12; 
      this.balance += interest;
      console.log(`Начисление процентов на дебетовый счет ${this.accountNumber}: ${interest}. Баланс: ${this.balance}`);
    }
  }
  
  class CreditAccount implements Account {
    accountNumber: string;
    balance: number;
    creditLimit: number;
    debt: number;
    monthlyFee: number = 100;
    interestRate: number = 0.10;
  
    constructor(accountNumber: string, creditLimit: number, initialBalance: number = 0) {
      this.accountNumber = accountNumber;
      this.creditLimit = creditLimit;
      this.balance = initialBalance;
      this.debt = 0;
    }
  
    deposit(amount: number): void {
      if (amount <= 0) {
        console.log("Сумма пополнения должна быть положительной.");
        return;
      }
      if (this.debt > 0) {
        const debtPayment = Math.min(amount, this.debt);
        this.debt -= debtPayment;
        console.log(`Погашение долга на сумму ${debtPayment}. Остаток долга: ${this.debt}`);
        amount -= debtPayment;
      }
      this.balance += amount;
      console.log(`Пополнение кредитного счета ${this.accountNumber} на сумму ${amount}. Баланс: ${this.balance}, долг: ${this.debt}`);
    }
  
    withdraw(amount: number): void {
      if (amount <= 0) {
        console.log("Сумма снятия должна быть положительной.");
        return;
      }
      if (amount > this.balance + (this.creditLimit - this.debt)) {
        console.log("Превышен лимит кредитного счета.");
        return;
      }
      if (amount <= this.balance) {
        this.balance -= amount;
      } else {
        const remainingAmount = amount - this.balance;
        this.balance = 0;
        this.debt += remainingAmount;
      }
      console.log(`Снятие с кредитного счета ${this.accountNumber} на сумму ${amount}. Баланс: ${this.balance}, долг: ${this.debt}`);
    }
  
    checkBalance(): number {
      console.log(`Баланс кредитного счета ${this.accountNumber}: ${this.balance}, долг: ${this.debt}`);
      return this.balance;
    }
  
    applyMonthlyFee(): void {
      if (this.balance >= this.monthlyFee) {
        this.balance -= this.monthlyFee;
        console.log(`Списание платы за обслуживание счета ${this.accountNumber}: ${this.monthlyFee}. Баланс: ${this.balance}`);
      } else {
        console.log(`Недостаточно средств для списания платы за обслуживание счета ${this.accountNumber}`);
      }
    }
  
    applyInterest(): void {
      const interest = this.debt * this.interestRate / 12;
      console.log(`Начисление процентов на кредитный долг по счету ${this.accountNumber}: ${interest}. Текущий долг: ${this.debt}`);
    }
  }
  
  // Пример работы
  const debitAccount = new DebitAccount("007", 500);
  debitAccount.deposit(200);
  debitAccount.withdraw(100);
  debitAccount.checkBalance();
  debitAccount.applyMonthlyFee(); // Оплата за обслуживание
  debitAccount.applyInterest(); // Начисление процентов
  
  const creditAccount = new CreditAccount("001", 1000, 300);
  creditAccount.deposit(100);
  creditAccount.withdraw(500);
  creditAccount.withdraw(700);
  creditAccount.checkBalance();
  creditAccount.applyMonthlyFee(); // Оплата за обслуживание
  creditAccount.applyInterest(); // Начисление процентов
  