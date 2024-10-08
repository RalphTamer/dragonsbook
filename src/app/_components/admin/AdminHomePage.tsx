"use client";

import type { User } from "@prisma/client";
import _ from "lodash";

import { api } from "~/trpc/react";
import SVGIcon from "../UI/SVGIcon";
import { useMemo, useState } from "react";
import { style } from "~/lib/styles";
import Link from "next/link";
import AsyncButton from "../UI/AsyncButton";
import Image from "next/image";
type Props = {
  users: {
    allUsers: Omit<User, "password" | "verified">[];
    usersCount: number;
  };
};
const AdminHomePage = (props: Props) => {
  const skipNum = 6;
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Props["users"]["allUsers"]>(
    props.users.allUsers,
  );
  const [skip, setSkip] = useState<number>(skipNum);
  const [usersCount, setUsersCount] = useState<number>(props.users.usersCount);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const debouncedHandleChange = useMemo(() => {
    return _.debounce(async (value: string) => {
      setIsSearchLoading(true);
      setSearchQuery(value);
      const searchData = await api.admin.getAllUsers.query({
        q: value,
        skip: 0,
      });
      setSkip(skipNum);
      setUsersCount(searchData.usersCount);

      setUsers(searchData.allUsers);
      setIsSearchLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="my-2">
        <input
          className="w-full px-4 py-2"
          style={{
            outline: "none",
            borderRadius: 18,
          }}
          placeholder="Search"
          type="text"
          name="q"
          onChange={async (e) => {
            await debouncedHandleChange(e.target.value);
          }}
        />
      </div>
      <div>
        {isSearchLoading === false ? (
          <div>
            {users.map((user) => {
              return (
                <Link
                  href={`/admin/user/${user.id}`}
                  key={user.id}
                  className="my-2 flex gap-4 py-4"
                >
                  <div className="w-[30%]">
                    <Image
                      src={user.image ?? "/images/character.jpg"}
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority
                      style={{
                        width: "100%",
                        height: "100%",
                        //
                        aspectRatio: 1,
                      }}
                    />
                  </div>
                  <div className="w-[70%]">
                    <div>{user.username}</div>
                    {/* <div>{user.email}</div> */}
                    <div>{user.fullname}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="my-4 flex justify-center">
            <SVGIcon name="loader" size={36} className="animate-spin" />
          </div>
        )}
      </div>

      <AsyncButton
        buttonText={users.length === usersCount ? "No More" : "Load more"}
        disabled={users.length === usersCount}
        onClick={async () => {
          await api.admin.getAllUsers
            .query({
              skip: skip,
              q: searchQuery,
            })
            .then((data) => {
              setUsers((prev) => {
                return [...prev, ...data.allUsers];
              });
              setUsersCount(data.usersCount);
              setSkip((prev) => prev + skipNum);
            });
        }}
        style={{
          borderRadius: 12,
          background: style.color.fireRed,
        }}
      />
    </div>
  );
};

export default AdminHomePage;
