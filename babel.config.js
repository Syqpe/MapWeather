module.exports = {
    presets: ["module:metro-react-native-babel-preset"],

    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                extensions: [
                    ".ios.js",
                    ".android.js",
                    ".js",
                    ".ts",
                    ".tsx",
                    ".json",
                ],
                alias: {
                    "@components":
                        "./src/shared/components/index.tsx",
                    "@API": "./src/app/api/index.ts",
                    "@pages": "./src/pages/index.tsx",
                    "@utils": "./src/shared/utils/index.ts",
                    "@localtypes":
                        "./src/shared/types/index.ts",
                    "@hooks": "./src/shared/hooks/index.ts",
                },
            },
        ],
    ],
};
