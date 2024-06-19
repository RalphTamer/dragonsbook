"use client";

import * as DateFns from "date-fns";
import { useField } from "formik";
import { useState } from "react";
import { style } from "~/lib/styles";
import DatePicker from "react-datepicker";
import _ from "lodash";

type Props = {
  name: string;
  type: string;
  placeholder: string;
  isDate?: boolean;
  setDateFieldValue?: (value: Date) => void;
};
const CustomInput = (props: Props) => {
  const { name, type, placeholder } = props;

  const [field, meta] = useField({
    name: name,
    type,
    placeholder,
  });
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  const [date, setDate] = useState<Date | null>(
    field.name === "dateOfBirth" && field.value != "" ? field.value : null,
  );
  /* eslint-enable @typescript-eslint/no-unsafe-argument */

  const years = _.range(1940, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div>
      <div
        className="relative"
        id={props.name}
        style={{
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: "32px",
        }}
      >
        {props.isDate != true ? (
          <input
            style={{
              background: "unset",
              outline: "none",
              width: "80%",
            }}
            {...field}
            {...props}
            className={
              meta.touched && meta.error != null
                ? "input-error px-4 py-3"
                : "px-4 py-3"
            }
          />
        ) : (
          <>
            <div
              className="px-4 py-3"
              style={{
                color: "#a9a9a9",
                fontWeight: 500,
              }}
            >
              <DatePicker
                maxDate={new Date()}
                renderCustomHeader={({ date, changeYear, changeMonth }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <select
                      className="px-2 py-2"
                      style={{
                        borderRadius: 12,
                      }}
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) =>
                        changeYear(parseInt(value))
                      }
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      className="px-2 py-2"
                      style={{
                        borderRadius: 12,
                      }}
                      value={months[date.getMonth()]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                className="date_picker"
                value={
                  date != null
                    ? `${DateFns.format(date, "d MMMM y")}`
                    : "Birth Date"
                }
                selected={date}
                onChange={(date) => {
                  setDate(date);
                  if (date != null && props.setDateFieldValue != null) {
                    props.setDateFieldValue(date);
                  }
                }}
              />
            </div>
          </>
        )}
        <div
          className="flex items-center"
          style={{
            position: "absolute",
            top: "50%",
            right: 15,
            transform: "translate(0%,-50%)",
          }}
        >
          {meta.touched && meta.error == null ? (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 18.75L20.0625 9.9375L18.3125 8.1875L11.25 15.25L7.6875 11.6875L5.9375 13.4375L11.25 18.75ZM13 25.5C11.2708 25.5 9.64583 25.1719 8.125 24.5156C6.60417 23.8594 5.28125 22.9688 4.15625 21.8438C3.03125 20.7188 2.14063 19.3958 1.48438 17.875C0.828125 16.3542 0.5 14.7292 0.5 13C0.5 11.2708 0.828125 9.64583 1.48438 8.125C2.14063 6.60417 3.03125 5.28125 4.15625 4.15625C5.28125 3.03125 6.60417 2.14063 8.125 1.48438C9.64583 0.828125 11.2708 0.5 13 0.5C14.7292 0.5 16.3542 0.828125 17.875 1.48438C19.3958 2.14063 20.7188 3.03125 21.8438 4.15625C22.9688 5.28125 23.8594 6.60417 24.5156 8.125C25.1719 9.64583 25.5 11.2708 25.5 13C25.5 14.7292 25.1719 16.3542 24.5156 17.875C23.8594 19.3958 22.9688 20.7188 21.8438 21.8438C20.7188 22.9688 19.3958 23.8594 17.875 24.5156C16.3542 25.1719 14.7292 25.5 13 25.5ZM13 23C15.7917 23 18.1563 22.0313 20.0938 20.0938C22.0313 18.1563 23 15.7917 23 13C23 10.2083 22.0313 7.84375 20.0938 5.90625C18.1563 3.96875 15.7917 3 13 3C10.2083 3 7.84375 3.96875 5.90625 5.90625C3.96875 7.84375 3 10.2083 3 13C3 15.7917 3.96875 18.1563 5.90625 20.0938C7.84375 22.0313 10.2083 23 13 23Z"
                fill="#1EE562"
              />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 18.75L20.0625 9.9375L18.3125 8.1875L11.25 15.25L7.6875 11.6875L5.9375 13.4375L11.25 18.75ZM13 25.5C11.2708 25.5 9.64583 25.1719 8.125 24.5156C6.60417 23.8594 5.28125 22.9688 4.15625 21.8438C3.03125 20.7188 2.14063 19.3958 1.48438 17.875C0.828125 16.3542 0.5 14.7292 0.5 13C0.5 11.2708 0.828125 9.64583 1.48438 8.125C2.14063 6.60417 3.03125 5.28125 4.15625 4.15625C5.28125 3.03125 6.60417 2.14063 8.125 1.48438C9.64583 0.828125 11.2708 0.5 13 0.5C14.7292 0.5 16.3542 0.828125 17.875 1.48438C19.3958 2.14063 20.7188 3.03125 21.8438 4.15625C22.9688 5.28125 23.8594 6.60417 24.5156 8.125C25.1719 9.64583 25.5 11.2708 25.5 13C25.5 14.7292 25.1719 16.3542 24.5156 17.875C23.8594 19.3958 22.9688 20.7188 21.8438 21.8438C20.7188 22.9688 19.3958 23.8594 17.875 24.5156C16.3542 25.1719 14.7292 25.5 13 25.5ZM13 23C15.7917 23 18.1563 22.0313 20.0938 20.0938C22.0313 18.1563 23 15.7917 23 13C23 10.2083 22.0313 7.84375 20.0938 5.90625C18.1563 3.96875 15.7917 3 13 3C10.2083 3 7.84375 3.96875 5.90625 5.90625C3.96875 7.84375 3 10.2083 3 13C3 15.7917 3.96875 18.1563 5.90625 20.0938C7.84375 22.0313 10.2083 23 13 23Z"
                fill="#737373"
              />
            </svg>
          )}
        </div>
      </div>
      {meta.touched && meta.error && (
        <div
          style={{
            color: style.color.fireRed,
            fontWeight: 500,
          }}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};
export default CustomInput;
