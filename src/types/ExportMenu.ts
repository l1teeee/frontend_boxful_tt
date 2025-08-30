
export interface ExportMenuProps {
    showMenu: boolean;
    exporting: boolean;
    ordersCount: number;
    onToggleMenu: () => void;
    onExportCSV: () => void;
    onExportPDF: () => void;
    disabled: boolean;
}