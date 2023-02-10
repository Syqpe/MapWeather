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
                        "@assets": "./src/shared/assets",
                    },
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
        [
            "module:react-native-dotenv",
            {
                envName: "APP_ENV",
                moduleName: "@env",
                path: "./src/app/env/.env",
                blocklist: null,
                allowlist: null,
                blacklist: null, // DEPRECATED
                whitelist: null, // DEPRECATED
                safe: false,
                allowUndefined: true,
                verbose: false,
            },
        ],
    ],
};
