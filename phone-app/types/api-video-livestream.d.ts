// Workaround: @api.video/react-native-livestream@2.0.2 ships a broken "types"
// path in package.json (points at lib/typescript/src/index.d.ts, which doesn't
// exist). Re-export the declarations from their real location so TypeScript can
// resolve them. Runtime resolution (Metro) is unaffected. Remove if a future
// version fixes the "types" field.
declare module "@api.video/react-native-livestream" {
  export * from "@api.video/react-native-livestream/lib/typescript/index";
}
