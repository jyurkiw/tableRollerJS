import { Table } from './interfaces/Table';
import { TableRow } from './interfaces/TableRow';
import { TableRoll } from './interfaces/TableRoll';
import { RollPlan } from './interfaces/RollPlan';
export interface RollerSize {
    tables: number;
    plans: number;
}
export declare class Roller {
    private rollPlans;
    private tables;
    addTable(table: Table): void;
    addTables(tables: Table[]): void;
    addRollPlan(plan: RollPlan): void;
    addRollPlans(plans: RollPlan[]): void;
    size(): RollerSize;
    getRollNum(tRoll: TableRoll): number;
    roll(planName: string, rolls?: number[]): string[];
    between(a: TableRow, roll: number, b: TableRow): number;
    private binarySearch(tableRows, targetValue);
    executeSubstitutions(value: string, substitutions: string[]): string;
    processTableRowValue(row: TableRow): string;
    weightedTableRoll(tableName: string, roll?: number): TableRow;
}
