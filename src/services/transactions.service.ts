import csvParser from "csv-parser";
import fs from 'fs';
import { Response } from "express";

interface ExpenseRow {
    Data: string;
    Estabelecimento: string;
    Categoria: string;
    Valor: string;
}

let numberOfExpensesMapped = 0;
let numberOfExpenses = 0;

const expensesNotMapped: ExpenseRow[] = [];

const categories = {
    'Transporte': [],
    'Alimentação': [],
    'Saúde': [],
    'Educação': [],
    'Lazer': [],
    'Outros': [],
    'Casa': [],
    'Taxas': [],
    'Compras': [],
    'Cuidados Pessoais': [],
};

const expensesByCategory = {
    'Transporte': 0,
    'Alimentação': 0,
    'Saúde': 0,
    'Educação': 0,
    'Lazer': 0,
    'Outros': 0,
    'Casa': 0,
    'Taxas': 0,
    'Compras': 0,
    'Cuidados Pessoais': 0,
};

const keywordMapping = {
    'UBER': 'Transporte',
    '99': 'Transporte',
    'IFOOD': 'Alimentação',
    'MERCADO': 'Alimentação',
    'PADARIA': 'Alimentação',
    'FARMACIA': 'Saúde',
    'DROGARIA': 'Saúde',
    'HOSPITAL': 'Saúde',
    'ESCOLA': 'Educação',
    'FACULDADE': 'Educação',
    'LIVRARIA': 'Educação',
    'CINEMA': 'Lazer',
    'PARQUE': 'Lazer',
    'TEATRO': 'Lazer',
    'VIAGEM': 'Lazer',
    'LAVANDERIA': 'Casa',
    'TOP': 'Transporte',
    'MARKET4U': 'Alimentação',
    'GRAN  COFFEE': 'Alimentação',
    'KUMA RESTAURANTE': 'Alimentação',
    'SPOLETO': 'Alimentação',
    'BANCOXPSEGUROCAR': 'Taxas',
    'DIGAE': 'Alimentação',
    'FELIXMERCHANT': 'Compras',
    'BR220 FO SHOPPING LIGH': 'Compras',
    'AMAZON': 'Compras',
    'MAGAZINELUIZA': 'Compras',
    'AMERICANAS': 'Compras',
    'RIACHUELO': 'Compras',
    'HAPPYMACHINE': 'Lazer',
    'PAG*SEUJOHBEER': 'Lazer',
    'BARBA DE REI': 'Cuidados Pessoais',
    'SHOPPING': 'Compras',
    'MERCADINHO': 'Alimentação',
    'CARREFOUR': 'Alimentação',
    'CAFE': 'Alimentação',
    'RESTAURANTE': 'Alimentação',
    'GUILHERME': 'Compras',
    'BEBIDORAMA': 'Alimentação',
};


function processCSVData(data: ExpenseRow) {
    const { Estabelecimento, Valor } = data;
    for (const keyword in keywordMapping) {
        const isLastExpenseMapped = keyword === Object.keys(keywordMapping)[Object.keys(keywordMapping).length - 1];
        if (String(Estabelecimento).toUpperCase().includes(keyword)) {
            categories[keywordMapping[keyword]].push(data);
            expensesByCategory[keywordMapping[keyword]] += parseMoneyValueFromCSV(Valor)

            numberOfExpensesMapped++;
            break;
        } else if (isLastExpenseMapped) {
            expensesNotMapped.push(data);
        }
    }

    numberOfExpenses++;
}

function parseMoneyValueFromCSV(value: string) {
    const cleanedValue = value.replace('R$', '').replace(',', '.').replace(' ', '');
    const parsedValue = parseFloat(cleanedValue);
    const roundedValue = Math.round(parsedValue * 100) / 100;
    return roundedValue;
}

export function handleCSVFile(file: Express.Multer.File | undefined, res: Response) {
    file?.path && fs.createReadStream(file?.path)
        .pipe(csvParser({ separator: ';' }))
        .on('data', processCSVData)
        .on('end', () => {
            console.table(expensesByCategory);
            console.log(`Total expenses mapped: ${numberOfExpensesMapped}`);
            console.log(`Total expenses: ${numberOfExpenses}`);
            console.log(`Total expenses not mapped: ${numberOfExpenses - numberOfExpensesMapped}`)
            console.table(expensesNotMapped);
            res.send('File uploaded and processed successfully');
        });
}
