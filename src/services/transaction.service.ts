import csvParser from "csv-parser";
import fs from 'fs';

import CategoryRepository from "../repositories/category.repository";
import EstablishmentCategoryRepository from "../repositories/establishmentCategory.repository";
import { CategoryRepositoryInterface } from "../interface/repositories/category.inteface";
import EstablishmentCategoryRepositoryInterface from "../interface/repositories/establishmentCategory.interface";
import { Prisma } from "@prisma/client";

interface ExpenseRow {
    Data: string;
    Estabelecimento: string;
    Categoria: string;
    Valor: string;
}

type EstablishmentCategoryGetPayload = Prisma.EstablishmentCategoryGetPayload<{
    include: {
        establishment: true;
        category: true;
    }
}>;

class TransactionService {
    private transactionsByCategory: Record<string, ExpenseRow[]> = {};
    private expensesByCategory: Record<string, number> = {};
    private expensesNotMapped: ExpenseRow[] = [];
    private transactions: ExpenseRow[] = [];
    private numberOfExpensesMapped = 0;
    private keywordMapping: Record<string, string> = {};

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface = CategoryRepository,
        private readonly establishmentCategoryRepository: EstablishmentCategoryRepositoryInterface = EstablishmentCategoryRepository,
    ) {}

    processCsvRow(row: ExpenseRow) {
        const { Estabelecimento, Valor } = row;

        this.transactions.push(row);

        for (const keyword in this.keywordMapping) {
            const isLastExpenseMapped = keyword === Object.keys(this.keywordMapping)[Object.keys(this.keywordMapping).length - 1];
            if (String(Estabelecimento).toUpperCase().trim().includes(keyword)) {
                const parsedValue = Number(String(Valor).replace('R$', '').replace(',', '.').replace(' ', '')) || 0;
                this.expensesByCategory[this.keywordMapping[keyword]] += parsedValue;

                this.numberOfExpensesMapped++;
                break;
            } else if (isLastExpenseMapped) {
                this.expensesNotMapped.push(row);
            }
        }
    }


    async groupTransactionsByCategory() {
        const categories = await this.categoryRepository.getAll();
        for (const category of categories) {
            this.transactionsByCategory[category.name] = [];
            this.expensesByCategory[category.name] = 0;
        }
    }

    async createEstablishmentCategoryMapping() {
        const establishmentCategories: EstablishmentCategoryGetPayload[] = await this.establishmentCategoryRepository.getAll<EstablishmentCategoryGetPayload>({
            include: {
                establishment: true,
                category: true
            }
        });
        for (const establishmentCategory of establishmentCategories) {
            this.keywordMapping[String(establishmentCategory.establishment.name).toUpperCase()] = establishmentCategory.category.name;
        }
    }

    public async handleCSVFile(file: Express.Multer.File | undefined) {
       await Promise.all([
            this.groupTransactionsByCategory(),
            this.createEstablishmentCategoryMapping()
        ])

        return new Promise((resolve, reject) => {
            if (!file) {
                return reject(new Error('No file provided'));
            }

            fs.createReadStream(file?.path)
                .pipe(csvParser({ separator: ';' }))
                .on('data', (row) => this.processCsvRow(row))
                .on('end', () => {
                    const expensesByCategoryArray = Object.keys(this.expensesByCategory).map((key) => {
                        return {
                            category: String(key).toUpperCase(),
                            value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.expensesByCategory[key])
                        }
                    });
                    console.table(expensesByCategoryArray);
                    console.log(`Total expenses mapped: ${this.numberOfExpensesMapped}`);
                    console.log(`Total expenses: ${this.transactions.length}`);
                    console.log(`Total expenses not mapped: ${this.transactions.length - this.numberOfExpensesMapped}`)
                    console.table(this.expensesNotMapped);

                    resolve({
                        expenses: this.expensesByCategory,
                        expensesNotMapped: this.expensesNotMapped,
                        expensesNotMappedValue: this.expensesNotMapped.reduce((acc, curr) => {
                            return acc + Number(String(curr.Valor).replace('R$', '').replace(',', '.').replace(' ', '')) || 0;
                        }, 0)
                    });
                })
        });
    }

}

export default new TransactionService();