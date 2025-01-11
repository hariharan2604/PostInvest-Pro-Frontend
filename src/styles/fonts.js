import localFont from "next/font/local";

export const inter = localFont({
    src: [
        {
            path: "../../public/fonts/Inter-Thin.woff",
            weight: "100",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-ExtraLight.woff",
            weight: "200",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-Light.woff",
            weight: "300",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-Regular.woff",
            weight: "400",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-Medium.woff",
            weight: "500",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-SemiBold.woff",
            weight: "600",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-Bold.woff",
            weight: "700",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-ExtraBold.woff",
            weight: "800",
            style: 'normal'
        },
        {
            path: "../../public/fonts/Inter-Black.woff",
            weight: "900",
            style: 'normal'
        },

    ],
    variable: "--font-inter"
});


