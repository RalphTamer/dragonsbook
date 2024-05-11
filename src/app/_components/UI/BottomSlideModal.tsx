"use client";
import { Fragment, ReactNode, useEffect, useState } from "react";
import SVGIcon from "./SVGIcon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const elem = document.getElementById("bottomSheet");
    if (elem == null) {
      if (isOpen === true) {
        console.error("could not find #bottomSheet");
      }
      return;
    }
    requestAnimationFrame(() => {
      elem.style.transform = `translate(0, ${isOpen === true ? "0%" : "100%"})`;
    });
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const zIndex = 1000000;
  return (
    <Fragment>
      <div
        onClick={onClose}
        style={{
          display: isOpen === true ? "block" : "none",
          position: "fixed",
          zIndex: zIndex - 1,
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
          height: "100%",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.4)",
          margin: 0,
        }}
      />
      <div
        id="bottomSheet"
        style={{
          position: "fixed",
          zIndex: zIndex,
          // left: 0,
          bottom: 0,
          //   top: 0,
          right: 0,
          height: "fit-content",
          width: "100vw",
          maxWidth: 500,
          overflowY: "auto",
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          willChange: "transform",
          transition: "transform .4s cubic-bezier(.17,.67,.83,.97)",
          transform: `translate(0%, 100%)`,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            padding: "16px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            top: 0,
            zIndex: 10,
          }}
        >
          <div onClick={onClose}>
            <SVGIcon name="x" size={28} />
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
