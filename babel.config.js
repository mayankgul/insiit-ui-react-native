module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    // env: {
    //   test: {
    //     plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    //   },
    //   production: {
    //     plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    //   },
    //   preview: {
    //     plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    //   },
    //   development: {
    //     plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    //   },
    // },
  };
};
