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
                alias: [
                    {
                        "@components":
                            "./src/shared/components",
                    },
                    {
                        "@hooks": "./src/shared/hooks",
                    },
                    {
                        "@utils": "./src/shared/utils",
                    },
                    {
                        "@localtypes": "./src/shared/types",
                    },
                    { "@pages": "./src/pages" },
                    { "@app": "./src/app" },
                    { "@API": "./src/app/api/index.ts" },
                ],
            },
        ],
    ],
};
