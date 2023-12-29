import { lineLength, lineCount } from "./B8";

export default function B8Light({
  animated = true,
  className,
}: {
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
        "--stroke-hightlight-length": lineLength,
      }}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 1920 1920"
      className={`${
        animated
          ? "[&_[data-stroke-animation]]:stroke-zinc-100/80 [&_[data-stroke-animation]]:stroke-[50] [&_[data-stroke-animation]]:animate-stroke-glow [&_[data-stroke-animation]]:stroke-dash-highlight"
          : undefined
      } ${className}`}
    >
      <path
        d="M78700 0h1920v1920h-1920z"
        style={{
          fill: "none",
        }}
        transform="translate(-78700)"
      />
      <path
        d="M24628.3 250.798h-133c-255 12.87-419.3 151.012-419.3 382.555 0 141.396 86.9 241.38 218.5 294.3-157.5 53.916-218.5 171.177-218.5 333.217 0 260.62 234.2 396.36 537.9 396.36 283.9 0 503-123.68 532.4-350.42 1.2-13.88 1.7-28.2 1.7-42.91v-7.88c0-20.41-1.1-39.83-3.4-58.29-24.6-129.67-101.9-226.505-243.5-273.896 105.7-45.507 159.6-119.402 186.8-223.94 4.7-23.78 7-48.973 7-75.433v-7.874c0-9.337-.2-18.501-.8-27.497-24.2-202.793-222.9-326.155-465.8-338.292Z"
        style={{
          fill: "none",
          "--stroke-animation-length": 4577.82421875,
          "--stroke-space-length": 4577.82421875 / lineCount - lineLength,
        }}
        data-stroke-animation
        transform="translate(-23640)"
      />
      <g transform="translate(-23640)">
        <path d="M24628.3 250.798h-133c-255 12.87-419.3 151.012-419.3 382.555 0 141.396 86.9 241.38 218.5 294.3-157.5 53.916-218.5 171.177-218.5 333.217 0 260.62 234.2 396.36 537.9 396.36 283.9 0 503-123.68 532.4-350.42 1.2-13.88 1.7-28.2 1.7-42.91v-7.88c0-20.41-1.1-39.83-3.4-58.29-24.6-129.67-101.9-226.505-243.5-273.896 105.7-45.507 159.6-119.402 186.8-223.94 4.7-23.78 7-48.973 7-75.433v-7.874c0-9.337-.2-18.501-.8-27.497-24.2-202.793-222.9-326.155-465.8-338.292Zm-19 1186.192c-124.3 0-224.2-71.46-224.2-201.56 0-130.09 101.7-201.55 226.1-201.55 126.2 0 222.3 71.46 222.3 199.72 0 130.1-96.1 203.39-224.2 203.39Zm-17.7-607.878c-112.2 0-206.5-67.75-206.5-180.02 0-112.271 90.2-180.021 204.5-180.021s202.6 71.622 202.6 178.085c0 114.206-84.3 181.956-200.6 181.956Z" />
        <clipPath id="b895d15197ae04a8c6dc6a345929c078">
          <path d="M24628.3 250.798h-133c-255 12.87-419.3 151.012-419.3 382.555 0 141.396 86.9 241.38 218.5 294.3-157.5 53.916-218.5 171.177-218.5 333.217 0 260.62 234.2 396.36 537.9 396.36 283.9 0 503-123.68 532.4-350.42 1.2-13.88 1.7-28.2 1.7-42.91v-7.88c0-20.41-1.1-39.83-3.4-58.29-24.6-129.67-101.9-226.505-243.5-273.896 105.7-45.507 159.6-119.402 186.8-223.94 4.7-23.78 7-48.973 7-75.433v-7.874c0-9.337-.2-18.501-.8-27.497-24.2-202.793-222.9-326.155-465.8-338.292Zm-19 1186.192c-124.3 0-224.2-71.46-224.2-201.56 0-130.09 101.7-201.55 226.1-201.55 126.2 0 222.3 71.46 222.3 199.72 0 130.1-96.1 203.39-224.2 203.39Zm-17.7-607.878c-112.2 0-206.5-67.75-206.5-180.02 0-112.271 90.2-180.021 204.5-180.021s202.6 71.622 202.6 178.085c0 114.206-84.3 181.956-200.6 181.956Z" />
        </clipPath>
        <g clipPath="url(#b895d15197ae04a8c6dc6a345929c078)">
          <path
            d="M2115 0h181.941v181.941H2115z"
            style={{
              fill: "url(#946aaacec42de896329a4bce972f0191)",
            }}
            transform="rotate(180 21285.35 850.255) scale(8.1401)"
          />
        </g>
      </g>
      <g transform="translate(-51220)">
        <path
          d="m51714.5 1461 360.8-1210.202H51656V1657.23h537.9c-212.8 0-391.5-66.66-479.4-196.23Z"
          style={{
            "--stroke-animation-length": 4164.94091796875,
            "--stroke-space-length": 4164.94091796875 / lineCount - lineLength,
          }}
          data-stroke-animation
        />
        <clipPath id="062a7b316a2eabef1439cde840b70a56">
          <path d="m51714.5 1461 360.8-1210.202H51656V1657.23h537.9c-212.8 0-391.5-66.66-479.4-196.23Z" />
        </clipPath>
        <g clipPath="url(#062a7b316a2eabef1439cde840b70a56)">
          <path
            d="M2115 0h181.941v181.941H2115z"
            style={{
              fill: "url(#2974c453af76a739b3a7a9b0b265e559)",
            }}
            transform="translate(34237 219.489) scale(8.1401)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="946aaacec42de896329a4bce972f0191"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(257.303) rotate(45 4.11 9.922)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fdfdfd",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.22}
            style={{
              stopColor: "#e1e1e1",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.49}
            style={{
              stopColor: "#9b9b9b",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.74}
            style={{
              stopColor: "#626262",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f4f4f",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="2974c453af76a739b3a7a9b0b265e559"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(257.303) rotate(45 4.11 9.922)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#fdfdfd",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.22}
            style={{
              stopColor: "#e1e1e1",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.49}
            style={{
              stopColor: "#9b9b9b",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.74}
            style={{
              stopColor: "#626262",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#4f4f4f",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
