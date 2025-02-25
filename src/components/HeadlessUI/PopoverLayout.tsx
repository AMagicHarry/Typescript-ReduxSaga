import { Fragment, ReactNode } from 'react'
import { Float } from '@headlessui-float/react';
import type { Placement } from '@floating-ui/dom';
import { Popover, Transition } from '@headlessui/react'

interface PopoverLayoutProps {
  toggler: ReactNode;
  children: ReactNode;
  togglerClass?: string;
  placement?: Placement;
  menuClass?: string;
  className?: string;
}

const PopoverLayout = ({ children, toggler, togglerClass, placement, menuClass, className }: PopoverLayoutProps) => {
  return (
    <Popover className={`relative ${className}`}>
      {({ open }) => (
        <>
          <Float placement={placement}>
            <Popover.Button className={togglerClass ?? ''}>
              {toggler}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={menuClass ?? ''}>
                {children}
              </Popover.Panel>
            </Transition>
          </Float>
        </>
      )}
    </Popover>
  )
}

export default PopoverLayout