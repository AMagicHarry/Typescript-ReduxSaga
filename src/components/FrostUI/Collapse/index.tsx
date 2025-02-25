import { ElementType, ReactNode, useState } from 'react'
import { CollapseContext } from './collapseContext';
import CollapseToggle from './CollapseToggle';
import CollapseMenu from './CollapseMenu';

export interface CollapseProps {
  as?: ElementType;
  open?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
  toggleCollapse?: () => void;
}

const Collapse = ({ children, open, toggleCollapse, defaultOpen = false }: CollapseProps) => {
  const [collapseOpen, setCollapseOpen] = useState<boolean>(defaultOpen);
  const handleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  }
  return (
    <CollapseContext.Provider value={{
      open: open ?? collapseOpen,
      handleCollapse: toggleCollapse ?? handleCollapse,
    }}>
      {children}
    </CollapseContext.Provider>
  )
}

export default Object.assign(Collapse, {
  Toggle: CollapseToggle,
  Menu: CollapseMenu,
})