import { style } from "~/lib/styles";

const Footer = () => {
  return (
    <div className="container mb-2 mt-8">
      <div
        className=" py-6"
        style={{
          fontSize: 13,
          fontWeight: 500,
          borderTop: "1px solid #8c8c8c",
          lineHeight: 1,
        }}
      >
        Attend and complete{" "}
        <span style={{ color: style.color.fireRed }}>Camp49</span> events to
        accumulate points, unlock new titles and earn rewards.
      </div>
    </div>
  );
};

export default Footer;
