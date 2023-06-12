import React from 'react';
import * as ReactDOM from 'react-dom';
import './ChatPortal.sass';

const ChartPortal = ({children}: { children: React.ReactNode }) => {
    const modalRoot = document.getElementById('modal-root');
    const [el] = React.useState(() => {
        return document.createElement('div');
    });

    React.useEffect(() => {
        el.classList.add('portal-wrapper');
        if (modalRoot) {
            modalRoot.appendChild(el);
            return () => {
                modalRoot.removeChild(el);
            };
        }
    }, [el, modalRoot]);

    return ReactDOM.createPortal(children, el);
};

export default ChartPortal;