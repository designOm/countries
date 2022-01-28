import React from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
  className?: string;
  parent?: HTMLElement;
}

export default function Portal({ children, parent, className }: Props) {
  const el = React.useRef(
    React.useMemo(() => document.createElement("div"), [])
  );
  React.useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;

    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ["portal-container"];
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => current.classList.add(item));
    target.appendChild(current);
    return () => {
      target.removeChild(current);
    };
  }, [el, parent, className]);
  return ReactDOM.createPortal(children, el.current);
}
