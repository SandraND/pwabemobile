export class Product {
    name: string;
    totalPriceEur: any;
    transactions = [];
    totalTransactions: any;
    totalAmountProduct = [];

    constructor(name) {
        this.name = name;
    }

    addTransaction(transactions, rates) {
        this.totalTransactions = this.transactions.push(transactions);
        this.addTotalAmountProduct(transactions);
        this.addTotalPriceEur(transactions, rates);
    }

    addTotalAmountProduct(transactions) {
        const amnt = this.totalAmountProduct.find((amount) => {
            return amount.currency === transactions.currency;
        });

        if (amnt) {
            amnt.qty++;
            amnt.amount += transactions.amount;
            amnt.amount = this.round(amnt.amount);
        } else {
            this.totalAmountProduct.push({qty: 1, amount: this.round(transactions.amount), currency: transactions.currency});
        }
    }

    addTotalPriceEur(transactions, rates) {
        let amount = transactions.amount;
        const currency = transactions.currency;

        if (currency !== 'EUR') {
            amount = this.amountPriceToEur(amount, currency, rates);
        }

        this.totalPriceEur += amount;
        this.totalPriceEur = this.round(this.totalPriceEur);
    }

    amountPriceToEur(amount, currency, rates) {
        let rte = rates.find((rate) => {
            return rate.from === currency && rate.to === 'EUR';
        });

        if (rte) {
            return amount *= rte.rate;
        } else {
            rte = rates.find((rate) => {
            return rate.from === currency;
        });
        return this.amountPriceToEur(amount *= rte.rate, rte.to, rates);
    }
}

    private round(value) {
        return Math.round(value * 100) / 100;
    }

}
