import { Table } from './interfaces/Table';
import { Store } from './store';
export declare const SubstituteRe_Search: any;
export declare class TableStore extends Store<Table> {
    constructor();
    add(table: Table): boolean;
    processTable(table: Table): boolean;
    calculateTableReferences(table: Table): Table;
    calculateWeightedIndexValues(table: Table): Table;
    calculateRowSubstitutions(table: Table): Table;
}
