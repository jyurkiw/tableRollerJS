export interface TableRow {
    value: string;
    weight: number;
    weightedIndex?: number;
    substitutions?: string[];
}
export declare function DeepCopyTableRow(row: TableRow): TableRow;
