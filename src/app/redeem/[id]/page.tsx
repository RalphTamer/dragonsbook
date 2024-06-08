import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SVGIcon from "~/app/_components/UI/SVGIcon";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const Redeem = async (props: { params: { id: string } }) => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/auth/login");
  }
  const redeem = await api.user.redeemPoints({
    id: props.params.id,
  });
  const src =
    redeem.type != null && `/icons/${redeem.type.toLowerCase()}-badge.png`;
  return (
    <div className="container my-8 mt-36 flex flex-col items-center justify-center">
      <div
        className="relative mb-2 p-4"
        style={{
          width: "33vw",
          aspectRatio: 1,
          background: "#000",

          borderRadius: 18,
        }}
      >
        <div>
          {redeem.success === true ? (
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Image
                src={src || "/images/character.jpg"}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  //
                  maxWidth: "20vw",
                }}
              />
            </div>
          ) : (
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <SVGIcon name="exclamation" size={80} color="#fff" />
            </div>
          )}
        </div>
      </div>
      <div
        className="mb-24"
        style={{
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {redeem.message}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: "bold",
        }}
        className="mx-12 mb-4 text-center"
      >
        {redeem.success === true
          ? "Your points have been added to your Dragon Book"
          : "No points added"}
      </div>
      <Link
        href={`/dragon-book/${redeem.userId}`}
        className="px-4 py-2"
        style={{
          background: "#000",
          color: "#fff",
          borderRadius: 18,
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        GO TO DRAGON BOOK
      </Link>
    </div>
  );
};

export default Redeem;
