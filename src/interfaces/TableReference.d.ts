export interface TableReference {
    table: string;
    min: number;
    max: number;
}
export declare function DeepCopyTableReference(reference: TableReference): TableReference;
