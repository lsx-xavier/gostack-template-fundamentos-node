import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransiction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const findIncome = this.transactions.filter(transaction =>
      transaction.type.includes('income'),
    );

    const { income } = findIncome.reduce(
      (accumulator, incomes) => {
        accumulator.income += incomes.value;
        return accumulator;
      },
      {
        income: 0,
      },
    );

    const findOutcome = this.transactions.filter(transaction =>
      transaction.type.includes('outcome'),
    );

    const outcome = findOutcome.reduce(
      (acumulador, outcomes) => acumulador + outcomes.value,
      0,
    );

    const balanceTotal = income - outcome;

    const Balance = {
      income,
      outcome,
      total: balanceTotal,
    };

    return Balance;
  }

  public create({ title, value, type }: CreateTransiction): Transaction {
    // TODO
    const transaction = new Transaction({ title, type, value });
    const { total } = this.getBalance();

    if (transaction.type === 'outcome' && total < transaction.value) {
      throw Error('This transaction is more of do you have!');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
