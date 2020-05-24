# study-in-action
> simple demo for cnode

## install global module
``` sh
npm install -g pnpm
```

## install local dependencies
``` sh
pnpm install
```


## build prepare libs
``` sh
pnpm run prepack
```

## Compiles and hot-reloads for development
``` sh
pnpm run dev --filter ./packages/cnode-web-vue
# or you can cd in packages/cnode-web-vue and run npm scripts
cd ./packages/cnode-web-vue
pnpm run dev
```
