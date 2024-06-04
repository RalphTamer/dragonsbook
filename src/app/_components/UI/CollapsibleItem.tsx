"use client";
import type { CSSProperties } from "react";
import React, { useState, useRef, useEffect } from "react";
import SVGIcon from "./SVGIcon";

type Props = {
  id: string;
  title: JSX.Element;
  headerStyle?: CSSProperties;
  titleWrapperStyle?: CSSProperties;
  renderBody: () => JSX.Element;
  className?: string;
  onRequestToggle?: () => void;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  xIconColorIfOpen?: string;
  fontColorIfOpen?: string;
  titleColorIsOpen?: string;
};

const CollapsibleItem = (props: Props) => {
  const { xIconColorIfOpen } = props;
  const internalRef = useRef<{
    maxHeight: number | "fit-content";
    parentRef: null | HTMLDivElement;
    timeout: null | NodeJS.Timeout;
    didMount: boolean;
  }>({
    timeout: null,
    parentRef: null,
    didMount: false,
    maxHeight: props.defaultIsOpen === true ? "fit-content" : 0,
  });

  const [isOpen, setIsOpen] = useState(
    props.defaultIsOpen === true || props.isOpen === true,
  );

  useEffect(() => {
    if (props.isOpen != null) {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  useEffect(() => {
    const containerRef = internalRef.current.parentRef;
    if (containerRef == null) {
      return;
    }

    if (internalRef.current.timeout != null) {
      clearTimeout(internalRef.current.timeout);
      internalRef.current.timeout = null;
    }

    if (internalRef.current.didMount === true) {
      containerRef.style.maxHeight = containerRef.scrollHeight + "px";
    }

    if (isOpen === true) {
      internalRef.current.timeout = setTimeout(() => {
        containerRef.style.maxHeight = "fit-content";
      }, 500);
    } else {
      requestAnimationFrame(() => {
        containerRef.style.maxHeight = "0px";
      });
    }

    internalRef.current.didMount = true;
  }, [isOpen]);

  return (
    <div
      className={props.className}
      style={{
        backgroundColor: isOpen ? props.fontColorIfOpen : "#fff",
        ...props.headerStyle,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          padding: "10px 0px",
          fontWeight: "bold",
          width: "100%",
          color: isOpen ? props.titleColorIsOpen : "unset",
          ...props.titleWrapperStyle,
        }}
        onClick={() => {
          if (props.onRequestToggle != null) {
            props.onRequestToggle();
          }

          if (props.isOpen == null) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {props.title}

        <div
          style={{
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "block",
              transition: "transform .25s ease-in-out",
              transform: `rotate(${isOpen === true ? "45" : "0"}deg)`,
            }}
          >
            <SVGIcon
              color={isOpen ? xIconColorIfOpen : "black"}
              size={20}
              name={"plus"}
            />
          </span>
        </div>
      </div>
      <div
        id="CollapsibleItemContent"
        ref={(ref) => {
          if (ref == null) {
            return;
          }

          internalRef.current.parentRef = ref;
        }}
        style={{
          maxHeight: isOpen === true ? "0px" : "fit-content",
          overflow: "hidden",
          transition: ".2s max-height linear",
          color: isOpen ? props.fontColorIfOpen : "unset",
        }}
      >
        {props.renderBody()}
      </div>
    </div>
  );
};

export default CollapsibleItem;
