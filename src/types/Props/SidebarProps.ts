export interface SidebarProps {
    activeTab: 'crear' | 'historial';
    setActiveTab: (tab: 'crear' | 'historial') => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    userName?: string;
}